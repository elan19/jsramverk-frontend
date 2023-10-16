<template>
    <div id='container' class='container'>
        <DelayedTrains />
        <Map :markers="connected" />
    </div>
</template>

<script>
import { isProxy, toRaw } from 'vue';
import { state } from "../socket.js";
import Map from '../components/Map.vue';
import DelayedTrains from '../components/DelayedTrains.vue';

export default {
    name: 'DelayedView',
    components: {
        Map,
        DelayedTrains
    },
    computed: {
        connected() {
            isProxy(state.trainData) ? 'yup' : 'nope'
            const train = toRaw(state.trainData);
            return train;
        }
    }
}
</script>

<style>
.container {
    height: 100vh;
    width: 100%;
    display: flex;
}

.delayed {
    height: 100vh;
    width: 40vw;
    padding: 2rem;
    overflow: scroll;
    background-color: white;
}

.map {
    height: 100vh;
    width: 60vw;
}
</style>