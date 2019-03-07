require("dotenv").load();
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueRouter);


const CurrencyProject = window.CurrencyProject = {};
CurrencyProject.env = process.env;

CurrencyProject.vue = new Vue({
  render: h => h(App),
  el:"#app",
  router,
  store
}).$mount('#app');