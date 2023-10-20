<template>
    <ChangeErrand />
</template>
  
<script>
import { isProxy, toRaw } from 'vue';
import { state } from "../socket.js";
import ChangeErrand from '../components/ChangeErrand'


export default {
    name: 'ErrandsView',
    props: {},
    components: {
        ChangeErrand,
    },
    computed: {
        connected() {
            isProxy(state.trainData) ? 'yup' : 'nope'
            const train = toRaw(state.trainData);
            console.log(train);
            return train;
        }
    }
};

</script>
