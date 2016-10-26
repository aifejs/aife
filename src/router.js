import Vue from 'vue';
import VueRouter from 'vue-router';
import routerParams from './routerParams';

Vue.use(VueRouter);

const router = new VueRouter(routerParams);

export default router;