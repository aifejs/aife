<template lang="pug">
article.cssEditor
    h3 Edit story stylesheet

    code-mirror("v-bind:options"="cssEditorOptions", "v-bind:code"="getStyleSheet" "@code-changed"="saveStyleSheet")
</template>

<style lang="stylus"></style>

<script>
    import CodeMirror from './common/CodeMirror.vue';
    import 'codemirror/mode/css/css';
    import {cssEditorOptions, getStyleSheet,} from '../vuex/getters';
    import {saveStyleSheet, openStylesheet,} from '../vuex/actions';
    export default {
        vuex: {
            getters: {
                cssEditorOptions,
                getStyleSheet,
            },

            actions: {
                saveStyleSheet,
                openStylesheet,
            },
        },

        components: {
            CodeMirror,
        },

        route: {
            data(transition) {
                this.openStylesheet();

                transition.next();
            },
        },
    };
</script>