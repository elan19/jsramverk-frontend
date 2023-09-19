import { createRouter, createWebHistory } from 'vue-router';

// Importera dina komponenter här
import DelayedTrainView from '@/views/DelayedTrainView'
import CreateTicketView from '@/views/CreateTicketView'
// import NavBar from '@/components/NavBar';
// import CreateTicket from '@/components/TrainTest';

const routes = [
    {
        path: '/',
        name: 'DelayedTrainView',
        component: DelayedTrainView
    },
    {
        path: '/CreateTicket',
        name: 'CreateTicket',
        component: CreateTicketView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;