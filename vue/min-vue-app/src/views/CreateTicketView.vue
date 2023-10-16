<template>
    <h1>CreateTicket</h1>
    <CreateTicket />
    <Map :markers="connected" />
</template>

<script>
import Map from '../components/Map.vue';
import { isProxy, toRaw } from 'vue';
import { state } from "../socket.js";
import CreateTicket from '../components/CreateTicket'
import { useRoute } from 'vue-router';

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
            console.log(item.OperationalTrainNumber)
            console.log(train.trainnumber)
            if (train.trainnumber === item.OperationalTrainNumber) {
                console.log("here");
                return train;
            }
            return ""
        }
    },
    setup() {
        const route = useRoute();
        const asyncData = JSON.parse(decodeURIComponent(route.query.data));
        console.log(asyncData)
    }

}

</script>

<style>
.delayed-trains {
    display: flex;
    flex-direction: column;
}
</style>