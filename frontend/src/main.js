import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import store from './store';

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount('#app');
