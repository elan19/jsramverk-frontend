import train from "./vue/min-vue-app/src/models/train.js";

async function renderMainView() {
    // import train from "vue/min-vue-app/src/models/train.js";

    let container = document.getElementById("container");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    container.innerHTML = `<div class="delayed">
                <h1>Försenade tåg</h1>

                <div id="delayed-trains" class="delayed-trains"></div>
            </div>
            <div id="map" class="map"></div>`;

    const socket = io("http://localhost:1337");

    const map = L.map('map').setView([62.173276, 14.942265], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let markers = {};

    socket.on("message", (data) => {
        if (markers.hasOwnProperty(data.trainnumber)) {
            let marker = markers[data.trainnumber]

            marker.setLatLng(data.position);
        } else {
            let marker = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);

            markers[data.trainnumber] = marker
        }
    });

    let delayed = document.getElementById("delayed-trains");

    //Request models imported

    let res = await train.getDelayed();
    renderDelayedTable(res, delayed);

}

function renderDelayedTable(data, table) {
    data.forEach((item) => {
        let element = document.createElement("div");

        element.innerHTML = `
            <div class="train-number">
                ${item.OperationalTrainNumber}
            </div>
            <div class="current-station">
                <div>${item.LocationSignature}</div>
                <div>${item.FromLocation ? item.FromLocation[0].LocationName + " -> " : ""} ${item.ToLocation ? item.ToLocation[0].LocationName : ""}</div>
            </div>
            <div class="delay">
                ${outputDelay(item)}
            </div>`;

        element.addEventListener("click", function () {
            renderTicketView(item);
        });

        table.appendChild(element);
    });
}

function outputDelay(item) {
    let advertised = new Date(item.AdvertisedTimeAtLocation);
    let estimated = new Date(item.EstimatedTimeAtLocation);

    const diff = Math.abs(estimated - advertised);

    return Math.floor(diff / (1000 * 60)) + " minuter";
}

async function renderTicketView(item) {
    let container = document.getElementById("container");
    let newTicketId = 0;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    var locationString = "";
    if (item.FromLocation) {
        locationString = `<h3>Tåg från ${item.FromLocation[0].LocationName} till ${item.ToLocation[0].LocationName}. Just nu i ${item.LocationSignature}.</h3>`;
    }

    container.innerHTML = `<div class="ticket-container">
            <div class="ticket">
                <a href="" id="back"><- Tillbaka</a>
                <h1>Nytt ärende #<span id="new-ticket-id"></span></h1>
                ${locationString}
                <p><strong>Försenad:</strong> ${outputDelay(item)}</p>
                <form id="new-ticket-form">
                    <label>Orsakskod</label><br>
                    <select id="reason-code"></select><br><br>
                    <input type="submit" value="Skapa nytt ärende" />
                </form>
            </div>
            <br>
            <div class="old-tickets" id="old-tickets">
                <h2>Befintliga ärenden</h2>
            </div>
        </div>`;


    let backButton = document.getElementById("back");
    let reasonCodeSelect = document.getElementById("reason-code");
    let newTicketForm = document.getElementById("new-ticket-form");
    let oldTickets = document.getElementById("old-tickets");

    backButton.addEventListener("click", function (event) {
        event.preventDefault();

        renderMainView();
    });

    newTicketForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        var newTicket = {
            code: reasonCodeSelect.value,
            trainnumber: item.OperationalTrainNumber,
            traindate: item.EstimatedTimeAtLocation.substring(0, 10),
        };
        //Request models imported
        let response = await train.createTicket(newTicket);
        renderTicketView(item);
    });

    //Request models imported
    const tickets = await train.getTickets();

    var lastId = 0
    let newTicketIdSpan = document.getElementById("new-ticket-id");
    tickets.data.forEach((ticket) => {
        let element = document.createElement("div");
        newTicketId = lastId + 1;

        element.innerHTML = `${newTicketId} - ${ticket.code} - ${ticket.trainnumber} - ${ticket.traindate}`;
        lastId = newTicketId;

        oldTickets.appendChild(element);
    });
    newTicketIdSpan.textContent = lastId + 1;

    //Request models imported
    let codes = await train.getCodes();
    codes.data.forEach((code) => {
        let element = document.createElement("option");

        element.textContent = `${code.Code} - ${code.Level3Description}`;
        element.value = code.Code;

        reasonCodeSelect.appendChild(element);
    });

}

renderMainView();
