<template lang="pug">
article.jsEditor.panel.panel-default
    div.panel-heading
        h3.panel-title Edit story script
    div.panel-body
        code-mirror("v-bind:options"="jsEditorOptions", "v-bind:code"="getScript" "@code-changed"="saveScript")
</template>

<style lang="stylus"></style>

<script>
    import CodeMirror from './CodeMirror.vue';
    import 'codemirror/mode/javascript/javascript';
    import {jsEditorOptions, getScript,} from '../vuex/getters';
    import {saveScript,} from '../vuex/actions';
    export default {
        vuex: {
            getters: {
                jsEditorOptions,
                getScript,
            },

            actions: {
                saveScript,
            },
        },

        components: {
            CodeMirror,
        },
    };
</script>