<template lang="pug">
article.passageEditor(v-if="passage")
    small pid \#{{passage.pid}}
    label
        | Passage title
        br
        input(placeholder="Passage title", required, "v-bind:value"="passage.title", @input="editPassage($event, passage.pid, 'title')")
    tag-list("v-bind:tags"="passage.tags", "v-bind:pid.once"="passage.pid", "v-bind:suggestions"="tagSuggestions", @add-tag="addTag", @remove-tag="removeTag")
    button("@click"="makeStarting(passage.pid)", ":disabled"="passage.starting") Make this passage starting
    label
        | Passage contents
        textarea.codeArea("v-bind:value"="passage.text", @input="editPassage($event, passage.pid, 'text')")
</template>

<style lang="stylus">
.passageEditor
    label
        display: block
        font-weight: normal
    textarea
        height: 400px
        font-weight: normal
</style>

<script type="module">
    import {getCurrentPassage, tagSuggestionsCounted,} from '../vuex/getters';
    import {openPassage, editPassage, addTag, removeTag, makeStarting,} from '../vuex/actions';
    import TagList from './common/TagList.vue';
    export default {
        name: 'passage-editor',
        vuex: {
            getters: {
                passage: getCurrentPassage,
                tagSuggestions: tagSuggestionsCounted,
            },
            actions: {
                openPassage,
                editPassage,
                addTag,
                removeTag,
                makeStarting,
            },
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
        },
    };
</script>