import Vue from 'vue';
// import { VueLoaderPlugin } from 'vue-loader';
import VueRouter from 'vue-router';

import Login from './pages/Login.vue';
import PhotoList from './pages/PhotoList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: PhotoList,
  },
  {
    path: '/login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
