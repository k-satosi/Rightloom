import Vue from 'vue';
import VueRouter from 'vue-router';

import PhotoList from './pages/PhotoList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: PhotoList,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
