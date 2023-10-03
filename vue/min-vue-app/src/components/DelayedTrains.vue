<template>
    <div class="delayed">
        <h1>Alla försenade tåg</h1>
        <div class="delayed-trains">
            <OneDelayed v-for="(data, index) in asyncData" :key="index" :asyncData="data" />
        </div>
    </div>
</template>


<script>
import OneDelayed from './OneDelayed.vue';
import { ref, onMounted } from 'vue';

import train from '../models/train.js';

export default {
    setup() {
        const asyncData = ref(null);

        onMounted(async () => {
            asyncData.value = await train.getDelayed();
        });
        return {
            asyncData,
        };
    },
    components: { OneDelayed },
    name: 'DelayedTrains',
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
</style>