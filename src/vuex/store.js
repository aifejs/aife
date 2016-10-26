import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';

import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

import {persistencePlugin,} from './addons';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,

    mutations,
    actions,
    getters,

    plugins: [
        persistencePlugin,
    ],

    strict: process.env.NODE_ENV !== 'production',
});

export default store;
