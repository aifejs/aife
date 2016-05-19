import Vue from 'vue';
import VueRouter from 'vue-router';

export default function routerSetup(params = {options: {}, aliases: {}, routes: {},}) {
    Vue.use(VueRouter);

    const router = new VueRouter(params.options);

    router.alias(params.aliases);
    router.map(params.routes);

    return router;
}