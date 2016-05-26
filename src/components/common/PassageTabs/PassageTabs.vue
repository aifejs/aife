<script type="module">
    import {addPassage, closePassage, closeStylesheet, closeScript, closeProofRead,} from '../../../vuex/actions';
    import {tabs, getCurrentIfid, getEditStylesheet, getEditScript, getProofRead,} from '../../../vuex/getters';
    export default {
        name: 'passage-tabs',

        vuex: {
            actions: {
                addPassage,
                closePassage,
                closeStylesheet,
                closeScript,
                closeProofRead,
            },

            getters: {
                tabs,
                ifid: getCurrentIfid,
                editStylesheet: getEditStylesheet,
                editScript: getEditScript,
                proofRead: getProofRead,
            },
        },
    }
</script>

<template lang="pug" src="./PassageTabs.pug"></template>
<style lang="stylus" src="./PassageTabs.styl"></style>