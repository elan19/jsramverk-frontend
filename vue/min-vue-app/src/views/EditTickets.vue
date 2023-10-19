<template>
    <div class="edit-ticket-container">
        <h1>Ärenden</h1>

        <div @click="redirect()" class="edit-ticket" v-for="x in data" :key="x.code">
            <h2>Trainnumber: {{ x.trainnumber }}</h2>
            <div class="ticket-info">
                <p>Code: {{ x.code }}</p>
                <p>Traindate: {{ x.traindate }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

function redirect() {
    // const encodedData = encodeURIComponent(JSON.stringify(props.asyncData));
    // router.push({ name: 'CreateTicket', params: { ticketId: 'someId' }, query: { data: encodedData } });
}

</script>

<script>
import train from '@/models/train';

let tickets = await train.getTickets();

export default {
    name: "EditTickets",
    data() {
        return tickets
    }
}
</script>

<style>
.edit-ticket-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 1em;
    overflow: scroll;
    width: 50vw;
    height: 60vh;
}

.edit-ticket {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: rgb(216, 216, 216);
    border: 1px;
    margin: 0.5em 0;
    padding: 0.5em;
    width: 40vw;

}

.ticket-info {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding-bottom: 0;
}

.edit-ticket p {
    margin: 0 2em;
    padding: 0;
}

.edit-ticket h2 {
    padding: 0;
    margin: 0;
}
</style>