<template lang="pug">
article.passageEditor(v-if="passage")
    small pid \#{{passage.pid}}
    label
        | Passage title
        br
        input(placeholder="Passage title", required, "v-bind:value"="passage.title", @input="editPassage($event, passage.pid, 'title')")
    tag-list("v-bind:tags"="passage.tags", "v-bind:pid.once"="passage.pid", "v-bind:suggestions"="tagSuggestions", @add-tag="addTag", @remove-tag="removeTag")
    label
        | Passage contents
        textarea("v-bind:value"="passage.text", @input="editPassage($event, passage.pid, 'text')")
</template>

<style lang="stylus">
.passageEditor
    label
        display: block
        font-weight: normal
    textarea
        width: 100%
        height: 400px
        font-weight: normal
</style>

<script>
    import {getCurrentPassage, tagSuggestionsCounted,} from '../vuex/getters';
    import {openPassage, editPassage, addTag, removeTag,} from '../vuex/actions';
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