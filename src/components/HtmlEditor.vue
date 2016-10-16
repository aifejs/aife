<template lang="pug">
article.codeEditor.htmlEditor
    label.codeArea
        strong Edit story HTML
        p
            | This is very advanced feature and you should be absolutely sure what you're doing.
            | This will completely replace built-in markup, don't forget to add scripts and styles from format (or provide your own).
            // | Place #[code {{STORY_NAME}}] and #[code {{STORY_NAME}}] markers where you want story name and data to be.

        code-mirror("v-bind:options"="htmlEditorOptions", "v-bind:code"="getHtml" "@code-changed"="saveHtml")
</template>

<style lang="stylus">
.htmlEditor
    label.codeArea
        code
            display: inline
</style>

<script>
    import CodeMirror from './common/CodeMirror.vue';
    import 'codemirror/mode/htmlmixed/htmlmixed';
    import {htmlEditorOptions, getHtml,} from '../vuex/getters';
    import {saveHtml, openHtml,} from '../vuex/actions';

    export default {
        vuex: {
            getters: {
                htmlEditorOptions,
                getHtml,
            },

            actions: {
                saveHtml,
                openHtml,
            },
        },

        components: {
            CodeMirror,
        },

        route: {
            data(transition) {
                this.openHtml();

                transition.next();
            },
        },
    };
</script>