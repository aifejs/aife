import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    strict: true,
    // middlewares: debug ? [createLogger()] : [],
});
