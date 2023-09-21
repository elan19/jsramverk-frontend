const train = {
    getDelayed: async function getDelayed() {
        const response = await fetch("http://localhost:1337/delayed");
        let result = await response.json();
        return result.data;
    },
    getTickets: async function getTickets() {
        const response = await fetch("http://localhost:1337/tickets");
        const result = await response.json();
        return result;
    },
    getCodes: async function getCodes() {
        const response = await fetch("http://localhost:1337/codes");
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
        let response = await fetch("http://localhost:1337/tickets", {
            body: JSON.stringify(newTicket),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        // let result = await response.json();
        return response;
    },

};

export default train;