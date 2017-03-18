<template lang="pug">
article.codeEditor.passageEditor(v-if="passage")
    label
        span Passage \#{{passage.pid}}
        button(@click="makeStarting(passage.pid)", :disabled="passage.starting") Make this passage starting

    label
        strong Title
        input(placeholder="Passage title", required, :value="passage.title", @input="onTitleChanged")

    label
        strong Tags
        tag-list(:tags="passage.tags", ":pid.once"="passage.pid", :suggestions="tagSuggestions", :special-tags="specialNames[story.format].tags", @add-tag="addTag", @remove-tag="removeTag")

    label.codeArea
        strong Text
            small.passageEditor-docs
                a(:href="docs[story.format]", target="_blank") format documentation
        code-mirror(:options="passageEditorOptions", :code="passage.text" @code-changed="onCodeChanged")
</template>

<style lang="stylus" rel="stylesheet/stylus">
.passageEditor
    &-docs
        margin-left: 1ex
        &::before
            content: '('
        &::after
            content: ')'

</style>

<script>
    import CodeMirror from '../code/CodeMirror.vue';
    import 'sugarcube-mode';
    import {mapGetters, mapActions,} from 'vuex';
    import TagList from './TagList.vue';
    import {documentations as docs,} from '../../lib/formatManager';
    import {specialNames,} from '../../lib/specialNames';

    export default {
        name: 'passage-editor',

        data() {
            return {
                docs,
                specialNames,
            };
        },

        computed: mapGetters({
            passage: 'getCurrentPassage',
            tagSuggestions: 'tagSuggestionsCounted',
            passageEditorOptions: 'passageEditorOptions',
            story: 'story',
        }),

        methods: {
            onCodeChanged(text) {
                this.editPassageText({pid: this.passage.pid, text,});
            },

            onTitleChanged(event) {
                this.editPassage({
                    value: event.target.value,
                    pid: this.passage.pid,
                    field: 'title',
                });
            },

            ...mapActions([
                'openPassage',
                'editPassage',
                'editPassageText',
                'addTag',
                'removeTag',
                'makeStarting',
            ]),
        },

        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.openPassage(to.params.pid);
            });
        },

        components: {
            TagList,
            CodeMirror,
        },
    };
</script>