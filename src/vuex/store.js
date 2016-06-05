import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import state from './state';
import {persistenceMw,} from './middlewares';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    strict: true,
    middlewares: [persistenceMw,],
});

export default store;
