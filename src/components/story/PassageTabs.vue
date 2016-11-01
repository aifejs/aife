<script>
    import {mapGetters, mapActions,} from 'vuex';
    import router from '../../router';
    import SpecialTab from './SpecialTab.vue';

    export default {
        name: 'passage-tabs',

        methods: {
            tabTitle({title, pid,}) {
                return `${title} #${pid}`;
            },

            gotoOverview() {
                router.push({name: 'overview', params: {ifid: this.ifid,},});
            },

            closeScriptAndGoBack() {
                this.gotoOverview();
                this.closeScript();
            },

            closeStylesheetAndGoBack() {
                this.gotoOverview();
                this.closeStylesheet();
            },

            closeHtmlAndGoBack() {
                this.gotoOverview();
                this.closeHtml();
            },

            closeProofReadAndGoBack() {
                this.gotoOverview();
                this.closeProofRead();
            },

            closePassageAndGoBack(pid) {
                this.gotoOverview();
                this.closePassage(pid);
            },

            ...mapActions([
                'addPassage',
                'closeScript',
                'closeStylesheet',
                'closeHtml',
                'closeProofRead',
                'closePassage',
            ]),
        },

        computed: mapGetters({
            tabs: 'tabs',
            ifid: 'getCurrentIfid',
            stylesheetEditing: 'getEditStylesheet',
            scriptEditing: 'getEditScript',
            htmlEditing: 'getEditHtml',
            proofReadEditing: 'getProofRead',
            story: 'story',
        }),

        components: {
            SpecialTab,
        },
    };
</script>

<template lang="pug" src="../../templates/passageTabs.pug"></template>
<style lang="stylus" src="../../styles/passageTabs.styl"></style>