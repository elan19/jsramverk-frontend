<template>
    <div @click="redirect" class="one-delay">
        <div class="train-number">{{ this.asyncData.OperationalTrainNumber }}</div>
        <div class="current-station">
            <div>{{ this.asyncData.LocationSignature }}</div>
            <div> {{ currentStation }}</div>
        </div>
        <div class="delay">
            {{ delay }}
        </div>
    </div>
</template >

<script>
import { useRouter } from 'vue-router';

export default {
    props: ['asyncData'],
    name: 'OneDelayed',
    setup(props) {
        let c = "";
        function setupData() {
            if (props.asyncData.FromLocation) {
                c = props.asyncData.FromLocation[0].LocationName
            }
            c += " till "
            if (props.asyncData.ToLocation) {
                c += props.asyncData.ToLocation[0].LocationName
            }
            return c
        }

        function outputDelay() {
            let advertised = new Date(props.asyncData.AdvertisedTimeAtLocation);
            let estimated = new Date(props.asyncData.EstimatedTimeAtLocation);
            const diff = Math.abs(estimated - advertised);
            return Math.floor(diff / (1000 * 60)) + " minuter";
        }

        const router = useRouter();

        function redirect() {
            const encodedData = encodeURIComponent(JSON.stringify(props.asyncData));
            router.push({ path: `/create-ticket/`, query: { data: encodedData } });
        }

        return {
            delay: outputDelay(),
            currentStation: setupData(),
            redirect,
        };
    }
}

</script>

<style>
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