<template>
    <div class="ticket-container">
        <div class="ticket">
            <a href="" id="back">- Tillbaka</a>
            <h1>Nytt ärende #{{ item.OperationalTrainNumber }}<span id="new-ticket-id"></span></h1>
            <p id="locationString"></p>
            <h3>{{ locationFromTo }}</h3>
            <p><strong>Försenad:</strong>{{ timeDelay }} </p>
            <form id="new-ticket-form">
                <label>Orsakskod</label><br>
                <select id="reason-code"></select><br><br>
                <input type="submit" value="Skapa nytt ärende" />
            </form>
        </div>
        <br>
        <div class="excisting-tickets" id="old-tickets">

        </div>
    </div>
</template>

<script>
import train from '@/models/train';
export default {
    name: 'CreateTicket',
    async mounted() {
        const router = this.$router
        const encoded = this.$route.query.data;
        const item = JSON.parse(decodeURIComponent(encoded))
        // var locationString = "";
        // if (item.FromLocation) {
        //     locationString = `<h3>Tåg från ${item.FromLocation[0].LocationName} till ${item.ToLocation[0].LocationName}. Just nu i ${item.LocationSignature}.</h3>`;
        // }
        // document.getElementById("locationString").innerHTML = locationString;

        let backButton = document.getElementById("back");
        let reasonCodeSelect = document.getElementById("reason-code");
        let newTicketForm = document.getElementById("new-ticket-form");
        let oldTickets = document.getElementById("old-tickets");

        backButton.addEventListener("click", function (event) {
            event.preventDefault();
            router.push({ path: `/` });
        });

        newTicketForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            var newTicket = {
                code: reasonCodeSelect.value,
                trainnumber: item.OperationalTrainNumber,
                traindate: item.EstimatedTimeAtLocation.substring(0, 10),
            };
            console.log(newTicket);
            //Request models imported
            await train.createTicket(newTicket);
            updateTickets();
        });


        async function updateTickets() {
            if (oldTickets.hasChildNodes()) {
                while (oldTickets.firstChild) {
                    oldTickets.removeChild(oldTickets.firstChild)
                }
            }
            let text = document.createElement("h2");
            text.innerHTML = "Befintliga ärenden"
            oldTickets.appendChild(text);

            let query = `{
                tickets
                { 
                    trainnumber
                    traindate
                    code
                } 
            }`

            let tickets = await train.graphQL(query);
            tickets = tickets.data
            // const tickets = await train.getTickets();
            // console.log(tickets)
            console.log(tickets);

            tickets.tickets.forEach((ticket) => {
                let element = document.createElement("div");

                element.innerHTML = `${ticket.code} - ${ticket.trainnumber} - ${ticket.traindate}`;

                oldTickets.appendChild(element);
            });
        }
        updateTickets();


        let codes = await train.getCodes();
        codes.data.forEach((code) => {
            let element = document.createElement("option");

            element.textContent = `${code.Code} - ${code.Level3Description}`;
            element.value = code.Code;

            reasonCodeSelect.appendChild(element);
        });
    },
    data() {
        //Sending data to template

        function outputDelay(item) {
            let advertised = new Date(item.AdvertisedTimeAtLocation);
            let estimated = new Date(item.EstimatedTimeAtLocation);

            const diff = Math.abs(estimated - advertised);

            return Math.floor(diff / (1000 * 60)) + " minuter";
        }

        const encoded = this.$route.query.data;
        const item = JSON.parse(decodeURIComponent(encoded))

        var locationString = "";
        if (item.FromLocation) {
            locationString = `Tåg från ${item.FromLocation[0].LocationName} till ${item.ToLocation[0].LocationName}. Just nu i ${item.LocationSignature}.`;
        }

        const timeDelay = outputDelay(item);
        return {
            locationFromTo: locationString,
            item,
            timeDelay
        }
    }
}
</script>

<style></style>