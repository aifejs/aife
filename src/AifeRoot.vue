<template lang="pug">
router-view
</template>

<style lang="stylus" src="./app.styl"></style>

<script>
    import store from './vuex/store';
    import {loadState,} from './vuex/actions';

    export default {
        name: 'aife-root',
        store,
        created() {
            this.loadState();
        },
        vuex: {
            actions: {
                loadState,
            },
        },
    };
</script>
