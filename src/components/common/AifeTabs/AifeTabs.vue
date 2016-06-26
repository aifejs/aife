<script>
    import {addPassage, closePassage, closeStylesheet, closeScript, closeProofRead,} from '../../../vuex/actions';
    import {
        tabs,
        getCurrentIfid,
        getEditStylesheet,
        getEditScript,
        getProofRead,
        getCurrentStory,
    } from '../../../vuex/getters';
    import router from '../../../router';

    export default {
        name: 'aife-tabs',

        methods: {
            tabTitle ({title, pid,}) {
                return `${title} #${pid}`
            }
        },

        vuex: {
            actions: {
                addPassage,
                closeScript,
                closeStylesheet,
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
                editStylesheet: getEditStylesheet,
                editScript: getEditScript,
                proofRead: getProofRead,
                story: getCurrentStory,
            },
        },
    };
</script>

<template lang="pug" src="./AifeTabs.pug"></template>
<style lang="stylus" src="./AifeTabs.styl"></style>