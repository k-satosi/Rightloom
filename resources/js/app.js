import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

import '../css/app.scss';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// import 'boostrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
