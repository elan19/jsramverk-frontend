<template>
    <div class="container">
        <CreateTicket />
        <Map :markers="connected" />
    </div>
</template>

<script>
import Map from '../components/Map.vue';
import { isProxy, toRaw } from 'vue';
import { state } from "../socket.js";
import CreateTicket from '../components/CreateTicket'

export default {

    name: "DelayedView",
    props: {},
    components: {
        CreateTicket,
        Map
    },
    computed: {
        connected() {
            const encoded = this.$route.query.data;
            const item = JSON.parse(decodeURIComponent(encoded))
            isProxy(state.trainData) ? 'yup' : 'nope'
            const train = toRaw(state.trainData);
            if (train.trainnumber === item.OperationalTrainNumber) {
                return train;
            }
            return ""
        }
    }

}

</script>

<style>
.delayed-trains {
    display: flex;
    flex-direction: column;
}

.container {
    display: flex;
}

.ticket-container {
    width: 40vw;
}
</style>