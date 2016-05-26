<template lang="pug">
router-view
</template>

<style lang="stylus" src="./app.styl"></style>

<script type="module">
    import store from './vuex/store';

    export default {
        name: 'aife-root',
        store,
    }
</script>
