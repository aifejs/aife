<template lang="pug">
article.codeEditor
    label.codeArea
        strong Edit story script
        code-mirror("v-bind:options"="jsEditorOptions", "v-bind:code"="getScript" "@code-changed"="saveScript")
</template>

<style lang="stylus"></style>

<script type="module">
    import CodeMirror from './common/CodeMirror.vue';
    import 'codemirror/mode/javascript/javascript';
    import {jsEditorOptions, getScript,} from '../vuex/getters';
    import {saveScript, openScript,} from '../vuex/actions';
    export default {
        vuex: {
            getters: {
                jsEditorOptions,
                getScript,
            },

            actions: {
                saveScript,
                openScript,
            },
        },

        components: {
            CodeMirror,
        },

        route: {
            data(transition) {
                this.openScript();

                transition.next();
            },
        },
    };
</script>