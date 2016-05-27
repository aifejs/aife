import Vue from 'vue';
import AifeRoot from './AifeRoot.vue';
import router from './router';
import store from './vuex/store';
import {sync,} from 'vuex-router-sync';

Vue.config.debug = true;

sync(store, router);

router.start(AifeRoot, 'aife-root');