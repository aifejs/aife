<template lang="pug">
article.codeEditor.passageEditor(v-if="passage")
    label
        span Passage \#{{passage.pid}}
        button("@click"="makeStarting(passage.pid)", ":disabled"="passage.starting") Make this passage starting

    label
        strong Title
        input(placeholder="Passage title", required, "v-bind:value"="passage.title", @input="editPassage($event, passage.pid, 'title')")

    label
        strong Tags
        tag-list("v-bind:tags"="passage.tags", "v-bind:pid.once"="passage.pid", "v-bind:suggestions"="tagSuggestions", @add-tag="addTag", @remove-tag="removeTag")

    label.codeArea
        strong Text
        code-mirror("v-bind:options"="passageEditorOptions", "v-bind:code"="passage.text" "@code-changed"="onCodeChanged")
</template>

<style lang="stylus"></style>

<script>
    import CodeMirror from '../common/CodeMirror.vue';
    import 'sugarcube-mode';
    import {getCurrentPassage, tagSuggestionsCounted, passageEditorOptions,} from '../../vuex/getters';
    import {openPassage, editPassage, editPassageText, addTag, removeTag, makeStarting,} from '../../vuex/actions';
    import TagList from '../common/TagList.vue';

    export default {
        name: 'passage-editor',
        vuex: {
            getters: {
                passage: getCurrentPassage,
                tagSuggestions: tagSuggestionsCounted,
                passageEditorOptions,
            },
            actions: {
                openPassage,
                editPassage,
                editPassageText,
                addTag,
                removeTag,
                makeStarting,
            },
        },
        methods: {
            onCodeChanged(text) {
                this.editPassageText(this.passage.pid, text)
            }
        },
        route: {
            data(transition) {
                this.openPassage(parseInt(transition.to.params.pid));

                if (this.passage === undefined) {
                    transition.abort('no such passage');
                } else {
                    transition.next();
                }
            },
        },
        components: {
            TagList,
            CodeMirror,
        },
    };
</script>