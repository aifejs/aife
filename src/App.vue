<template lang="pug">
passage-tabs
router-view
</template>

<style lang="stylus" src="./app.styl"></style>

<script type="module">
    import PassageTabs from './components/PassageTabs/PassageTabs.vue';
    import store from './vuex/store';
    import addPassage from './vuex/actions';

    export default {
        name: 'app',
        store,
        vuex: {

        },
        components: {
            PassageTabs,
        }
    }
</script>
