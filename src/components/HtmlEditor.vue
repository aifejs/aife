<template lang="pug">
article.codeEditor.htmlEditor
    label.codeArea
        strong Edit story HTML
        p
            | This is very advanced feature and you should be absolutely sure what you're doing.
            | This will completely replace built-in markup, so don't forget to
            | #[span.pseudo(title="Insert format source", "@click"="insertFormatSource") add scripts and styles from format]
            | (or provide your own).
            // | Place #[code {{STORY_NAME}}] and #[code {{STORY_NAME}}] markers where you want story name and data to be.

        code-mirror("v-bind:options"="htmlEditorOptions", "v-bind:code"="getHtml", "@code-changed"="saveHtml")
</template>

<style lang="stylus" rel="stylesheet/stylus">
@import '../styles/colors'
.htmlEditor
    label.codeArea
        code
            display: inline

        .pseudo
            cursor: pointer
            color: color-link
            border-bottom: 1px dashed white
            &:hover
                border-bottom-color: currentColor
</style>

<script>
    import CodeMirror from './common/CodeMirror.vue';
    import 'codemirror/mode/htmlmixed/htmlmixed';
    import {htmlEditorOptions, getHtml, getCurrentStory,} from '../vuex/getters';
    import {saveHtml, openHtml,} from '../vuex/actions';
    import {formats,} from '../lib/formatManager';

    export default {
        vuex: {
            getters: {
                htmlEditorOptions,
                getHtml,
                story: getCurrentStory,
            },

            actions: {
                saveHtml,
                openHtml,
            },
        },

        components: {
            CodeMirror,
        },

        methods: {
            insertFormatSource() {
                const format = formats[this.story.format];
                format.load().then(
                    () => {
                        this.saveHtml(format.properties.source);
                    }
                )
            }
        },

        route: {
            data(transition) {
                this.openHtml();

                transition.next();
            },
        },
    };
</script>