<template lang="pug">
article.codeEditor.htmlEditor
    label.codeArea
        strong Edit story HTML
        p
            | This is very advanced feature and you should be absolutely sure what you're doing.
            | This will completely replace built-in markup, so don't forget to
            | #[span.pseudo(title="Insert format source", @click="insertFormatSource") add scripts and styles]
            |  from format (or provide your own).
            // | Place #[code {{STORY_NAME}}] and #[code {{STORY_NAME}}] markers
            // | where you want story name and data to be.

        code-mirror(:options="htmlEditorOptions", :code="getHtml", @code-changed="saveHtml")
</template>

<script>
import {mapGetters, mapActions,} from 'vuex';

import CodeMirror from './CodeMirror.vue';

import {formats,} from '../../lib/formatManager';

export default {
    name: 'HtmlEditor',

    components: {
        CodeMirror,
    },

    computed: mapGetters({
        htmlEditorOptions: 'htmlEditorOptions',
        getHtml: 'getHtml',
        story: 'story',
    }),

    methods: {
        insertFormatSource() {
            const format = formats[this.story.format];
            format.load().then(
                () => {
                    this.saveHtml(format.properties.source);
                }
            );
        },

        ...mapActions([
            'saveHtml',
            'openHtml',
        ]),
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.openHtml();
        });
    },
};
</script>

<style lang="stylus">
@import '../../styles/colors'
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