import Vue from 'vue';
import AifeRoot from './AifeRoot.vue';
import router from './router';
import store from './vuex/store';
import {sync,} from 'vuex-router-sync';
import {mapActions,} from 'vuex';

sync(store, router);

const aifeApp = new Vue({
    router,
    store,

    created() {
        this.loadState();
    },

    methods: mapActions([
        'loadState',
    ]),

    components: {
        AifeRoot,
    },
});

aifeApp.$mount('aife-root');