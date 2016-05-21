<template lang="pug">
article.cssEditor
    code-mirror("v-bind:options"="cssEditorOptions", "v-bind:code"="getStyleSheet" "@code-changed"="saveStyleSheet")
</template>

<style lang="stylus"></style>

<script>
    import CodeMirror from './CodeMirror.vue';
    import 'codemirror/mode/css/css';
    import {cssEditorOptions, getStyleSheet,} from '../vuex/getters';
    import {saveStyleSheet,} from '../vuex/actions';
    export default {
        vuex: {
            getters: {
                cssEditorOptions,
                getStyleSheet,
            },

            actions: {
                saveStyleSheet,
            },
        },

        components: {
            CodeMirror,
        },
    };
</script>