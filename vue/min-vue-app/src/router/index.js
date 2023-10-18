import { createRouter, createWebHistory } from 'vue-router';

// Importera dina komponenter här
import DelayedTrainView from '@/views/DelayedTrainView'
import CreateTicketView from '@/views/CreateTicketView'
import DelayedView from '@/views/DelayedView'
import ErrandsView from '@/views/ErrandsView'

// import NavBar from '@/components/NavBar';
// import CreateTicket from '@/components/TrainTest';
// import Map from '@/components/Map';

const routes = [
    {
        path: '/',
        name: 'DelayedTrainView',
        component: DelayedTrainView
    },
    {
        path: '/create-ticket/:ticketId',
        name: 'CreateTicket',
        component: CreateTicketView
    },
    {
        path: '/~elan19/editor/',
        name: 'StartView',
        component: DelayedTrainView
    },
    {
        path: '/delayed',
        name: 'DelayedView',
        component: DelayedView
    },
    {
        path: '/errands',
        name: 'ErrandsView',
        component: ErrandsView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;