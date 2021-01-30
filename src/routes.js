//import Cadastro from './components/cadastro/Cadastro.vue';
const Cadastro = () => System.import('./components/cadastro/Cadastro.vue');

import Home from './components/home/Home.vue';

export const routes = [
    { 
        path: '', 
        name: 'home', 
        component: Home, 
        titulo: 'Home',
        menu: true
    },
    
    { 
        path: '/cadastro', 
        name: 'cadastro', 
        component: Cadastro, 
        titulo: 'Cadastro',
        menu: true
    },

    { 
        path: '/update/:id', 
        name: 'alterar', 
        component: Cadastro, 
        titulo: 'Alterar',
        menu: false
    },

    {
        path: '*', 
        component: Home,
        menu: false
    },
];