<template>
    <div class="container" id="container">
        <DelayedTrains />
        <Map />
    </div>
</template>

<script>
import Map from '../components/Map.vue';
import DelayedTrains from '../components/DelayedTrains.vue';

export default {
    name: "DelayedView",
    components: {
        Map,
        DelayedTrains,
    },
    props: {}
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