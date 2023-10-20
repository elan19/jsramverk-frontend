
const train = {
    checkUrl: function checkUrl() {
        let path = "";
        if (process.env.NODE_ENV !== "production") {
            path = "http://localhost:1337/";
        } else {
            path = "https://jsramverk-train-elan19.azurewebsites.net/";
        }

        return path
    },
    getDelayed: async function getDelayed() {
        try {
            const response = await fetch(this.checkUrl() + "delayed");
            let result = await response.json();
            return result.data;
        } catch (error) {
            console.error("Error could not fetch data:", error);
        }

    },
    getTickets: async function getTickets() {
        const response = await fetch(this.checkUrl() + "tickets");

        const result = await response.json();
        return result;
    },
    //Implemented path for trains and for ticket
    graphQL: async function graphQL(uQuery) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", 'application/json');

        var graphql = JSON.stringify({
            query: uQuery,
            variables: {}
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'manual'
        };

        let response = await fetch(this.checkUrl() + "graphql", requestOptions);
        const result = await response.json();
        return result
    },
    getCodes: async function getCodes() {
        const response = await fetch(this.checkUrl() + "codes");

        const result = await response.json();
        return result;
    },

    createTicket: async function createTicket(newTicket) {
        //______ TICKET STRUCTURE ______
        // var newTicket = {
        //     code: reasonCodeSelect.value,
        //     trainnumber: item.OperationalTrainNumber,
        //     traindate: item.EstimatedTimeAtLocation.substring(0, 10),
        // };
        console.log(this.checkUrl())
        let response = await fetch(this.checkUrl() + "tickets", {
            body: JSON.stringify(newTicket),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        // let result = await response.json();
        return response;
    },

    updateTicket: async function updateTicket(ticketId, editTicket) {
        console.log(editTicket);
        let response = await fetch(this.checkUrl() + "tickets/" + ticketId, {
            body: JSON.stringify(editTicket),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
        return response;
    },

};

export default train;