<script>
    import {
        addPassage,
        closePassage,
        closeStylesheet,
        closeScript,
        closeHtml,
        closeProofRead,
    } from '../../../vuex/actions';
    import {
        tabs,
        getCurrentIfid,
        getEditStylesheet,
        getEditScript,
        getEditHtml,
        getProofRead,
        getCurrentStory,
    } from '../../../vuex/getters';
    import router from '../../../router';
    import SpecialTab from './SpecialTab.vue';

    export default {
        name: 'aife-tabs',

        methods: {
            tabTitle({title, pid,}) {
                return `${title} #${pid}`;
            },
        },

        vuex: {
            actions: {
                addPassage,
                closeScript,
                closeStylesheet,
                closeHtml,
                closeProofRead,
                closePassage,

                closeScriptAndGoBack() {
                    router.go({name: 'overview',});
                    this.closeScript();
                },

                closeStylesheetAndGoBack() {
                    router.go({name: 'overview',});
                    this.closeStylesheet();
                },

                closeHtmlAndGoBack() {
                    router.go({name: 'overview',});
                    this.closeHtml();
                },

                closeProofReadAndGoBack() {
                    router.go({name: 'overview',});
                    this.closeProofRead();
                },

                closePassageAndGoBack(store, pid) {
                    router.go({name: 'overview',});
                    this.closePassage(pid);
                },
            },

            getters: {
                tabs,
                ifid: getCurrentIfid,
                stylesheetEditing: getEditStylesheet,
                scriptEditing: getEditScript,
                htmlEditing: getEditHtml,
                proofReadEditing: getProofRead,
                story: getCurrentStory,
            },
        },

        components: {
            SpecialTab,
        },
    };
</script>

<template lang="pug" src="./AifeTabs.pug"></template>
<style lang="stylus" src="./AifeTabs.styl"></style>