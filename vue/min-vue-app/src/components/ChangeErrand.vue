<template>
    <div class="ticket-container">
        <div class="form-container">
            <form id="change-ticket-form">
                <label id="label-orsakskod">Orsakskod</label><br>
                <select id="reason-code"></select><br><br>
                <input type="submit" value="Ändra ärende" />
            </form>
        </div>
        <div class="old-tickets" id="old-tickets">

        </div>
    </div>
</template>

<script>
import train from '@/models/train';
export default {
    name: 'ChangeErrand',
    async mounted() {
        let info = {
            selectedErrand: -1, // Index of the selected errand
            editedTicket: {
                code: '',
                trainnumber: '',
                traindate: '',
            },
            ticketsArray: [],
        };

        let reasonCodeSelect = document.getElementById("reason-code");
        let changeTicketForm = document.getElementById("change-ticket-form");
        let oldTickets = document.getElementById("old-tickets");
        const formContainer = document.getElementById("change-ticket-form");
        formContainer.style.display = "none";
        const tickets = await train.getTickets();

        await tickets.data.forEach((ticket) => {
            info.ticketsArray.push(ticket);
        })

        changeTicketForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            var changeTicket = {
                id: tickets.data[info.selectedErrand]._id,
                code: reasonCodeSelect.value,
                trainnumber: info.editedTicket.trainnumber,
                traindate: info.editedTicket.traindate,
            };
            //Request models imported
            await train.updateTicket(tickets.data[info.selectedErrand]._id, changeTicket);
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
            const tickets = await train.getTickets();

            tickets.data.forEach((ticket, index) => {
                let element = document.createElement("div");
                let button = document.createElement("button");
                button.textContent = "Edit";
                button.addEventListener("click", () => {
                    selectErrand(index); 
                    formContainer.style.display = "block";
                    const labelOrsakskod = document.getElementById("label-orsakskod");
                    labelOrsakskod.innerHTML = "ID: " + info.selectedErrand + " | Orsakskod - " + ticket.code;
                });

                element.innerHTML = `
                <div style="text-align: center; height: 30px; text-decoration: underline">
                    ${index}
                </div>
                <div class="errand-text left">Code: ${ticket.code}</div>
                <div class="errand-text">Trainnumber: ${ticket.trainnumber}</div>
                <div class="errand-text">Date: ${ticket.traindate}</div>
                `;

                element.classList.add("errand");
                button.classList.add("editBtn");
                oldTickets.appendChild(element);
                element.appendChild(button);
            });
        }
        updateTickets();

        const selectErrand = (id) => {
            info.selectedErrand = id;
            info.editedTicket = info.ticketsArray[id];
        }

        let codes = await train.getCodes();
        codes.data.forEach((code) => {
            let element = document.createElement("option");

            element.textContent = `${code.Code} - ${code.Level3Description}`;
            element.value = code.Code;

            reasonCodeSelect.appendChild(element);
        });
    },
    methods: {
        selectErrand(id) {
            this.selectedErrand = id;
            this.editedTicket = this.ticketsArray.find((ticket) => ticket.id === id);
        },
    }

}
</script>

<style>

.form-container {
    width: 40%;
    float: right;
    font-size: 30px;
    margin-right: 5%;
}

.form-container input {
    width: 100px;
    height: 30px;
}

.errand {
    height: 100px;
    font-size: 20px;
    margin-bottom: 10px;
    background-color: #ccc;
    text-align: center;
    width: 95%;
}

.errand-text {
    display: flex;
    text-align: center;
    height: 35px;
}

.left {
    float: left;
    height: 70px;
    width: 37.5%;
    line-height: 50px;
    margin-left: 10px;
}

.old-tickets {
    height: 750px;
    width: 45%;
    overflow-y: auto;
}

.editBtn {
    width: 50px;
    height: 40px;
    margin-right: 50px;
    position: relative;
    top: -70px;
    right: -45%;
    cursor: pointer;
    border: none;
    border-radius: 5px;
}

.editBtn:hover {
    background-color: grey;
}

.ticket-container {
    width: 100%;
}
</style>