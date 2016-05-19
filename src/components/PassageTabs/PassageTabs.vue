<script type="module">
    import {addPassage, closePassage} from '../../vuex/actions';
    import {tabs} from '../../vuex/getters';
    export default {
        name: 'passage-tabs',

        vuex: {
            actions: {
                addPassage,
                closePassage,
            },

            getters: {
                tabs,
            },
        },
    }
</script>

<template lang="pug" src="./PassageTabs.pug"></template>
<style lang="stylus" src="./PassageTabs.styl"></style>