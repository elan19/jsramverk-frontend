<template>
    <h1>CreateTicket</h1>
    <CreateTicket />
</template>

<script>
import CreateTicket from '../components/CreateTicket'
// import { useRoute } from 'vue-router';

export default {

    name: "DelayedView",
    props: {},
    components: {
        CreateTicket,
    }
}

</script>

<style>
.delayed-trains {
    display: flex;
    flex-direction: column;
}
</style>