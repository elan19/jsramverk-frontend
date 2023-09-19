<template>
    <h1>Delayed Trains</h1>
    <div class="container" id="container">
        <div id="delayed-trains" class="delayed-trains">
            <h1>Alla försenade tåg</h1>
            <p>Försenade tåg - Objekt</p>
        </div>
        <Map></Map>
    </div>
</template>

<script>
import Map from '../components/Map.vue';

export default {
    name: "DelayedView",
    components: {
        Map
    },
    props: {}
}

</script>

<style>
    .container {
        display: flex;
    }
    .delayed-trains {
        width: 50%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>