import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

// Agregamos la URL base de nuestra API
//axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.baseURL = 'https://coldream.herokuapp.com/api';

Vue.use(VueAxios, axios)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
