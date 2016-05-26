import Vue from 'vue';
import AifeRoot from './AifeRoot.vue';
import routerSetup from './lib/routerSetup';
import routerParams from './routerParams';
import store from './vuex/store';
import {sync,} from 'vuex-router-sync';

Vue.config.debug = true;

const router = routerSetup(routerParams);

sync(store, router);

router.start(AifeRoot, 'aife-root');