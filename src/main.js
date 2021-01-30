import Vue from 'vue'
import App from './App.vue'

// VueResource
import VueResource from 'vue-resource';
Vue.use(VueResource);

// VueRouter
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//Importando Arquivos Css
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/teste.css';

//Importando Arquivos JS
import './assets/js/teste.js';
import 'bootstrap/dist/js/bootstrap.js';

// Importando uma diretiva customizada
import './directives/Transform';

// VeeValidate para validação de formulário
import { ValidationObserver, ValidationProvider, localize } from 'vee-validate';
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// Alterando idioma do VeeValidate
// import vv_ptBR from 'vee-validate/dist/locale/pt_BR.json';
localize({
  pt_BR: {
    messages: {
      required: 'O campo {_field_} é obrigatório...',
    }
  }
});
localize('pt_BR');

// Configurando as rotas
import { routes } from './routes';
const router = new VueRouter({ 
  routes, 
  mode: 'history'
});

//Definindo root http
Vue.http.options.root = "http://localhost:3000";


new Vue({
  el: '#app',
  //passando a configuração das rotas
  router,
  render: h => h(App)
})

