<template lang="pug">
article.codeEditor
    label.codeArea
        strong Edit story script
        code-mirror("v-bind:options"="cssEditorOptions", "v-bind:code"="getStyleSheet", "@code-changed"="saveStyleSheet")
</template>

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