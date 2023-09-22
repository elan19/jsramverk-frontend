<template>
    <div id="delayed" class="delayed">
        <h1>Alla försenade tåg</h1>
        <div id="delayed-trains"></div>
    </div>
</template>


<script>

import train from '../models/train.js';
// const router = this.router;


export default {
    name: 'DelayedTrains',

    mounted() {
        //Router for redirect to new route
        const router = this.$router

        async function createDelayed() {
            let data = await train.getDelayed();
            let delayed = document.getElementById("delayed-trains");

            data.forEach((item) => {
                let element = document.createElement("div");
                element.className = "one-delay"

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
                //ADD REDIRECT TO VIEW FOR THAT TICKET
                element.addEventListener("click", function () {
                    const encodedData = encodeURIComponent(JSON.stringify(item))
                    router.push({ path: `/create-ticket/`, query: { data: encodedData } });
                });

                delayed.appendChild(element);
            });
        }

        createDelayed();

        function outputDelay(item) {
            let advertised = new Date(item.AdvertisedTimeAtLocation);
            let estimated = new Date(item.EstimatedTimeAtLocation);

            const diff = Math.abs(estimated - advertised);

            return Math.floor(diff / (1000 * 60)) + " minuter";
        }
    }
}
</script>


<style>
.delayed-trains {
    display: flex;
    flex-direction: column;
}

.one-delay {
    display: flex;
    flex-direction: row;
    border-top: 1px solid #ccc;
    padding: 0.2rem 0.8rem;
    align-items: center;
    cursor: pointer;
}

.one-delay:nth-of-type(2n) {
    background-color: #eee;
}

.train-number {
    font-size: 2rem;
    font-weight: bold;
    width: 30%;
}

.current-station {
    width: 30%;
}

.ticket-container {
    padding: 2rem;
}
</style>