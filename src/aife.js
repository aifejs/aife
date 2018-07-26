import Vue from 'vue';
import {mapActions,} from 'vuex';
import {sync,} from 'vuex-router-sync';

import './faIcons';

import AifeRoot from './AifeRoot.vue';
import router from './router';
import store from './vuex/store';

sync(store, router);

Vue.config.productionTip = false;

const aifeApp = new Vue({
    router,
    store,

    components: {
        AifeRoot,
    },

    created() {
        this.loadState();
    },

    methods: mapActions([
        'loadState',
    ]),
});

aifeApp.$mount('aife-root');