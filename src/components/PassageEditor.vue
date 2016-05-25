<template lang="pug">
article.passageEditor(v-if="passage")
    input(placeholder="Passage title", required, "v-bind:value"="passage.title", @input="editPassage($event, passage.pid, 'title')")
    small (\#{{passage.pid}})
    tag-list("v-bind:tags"="passage.tags", "v-bind:pid.once"="passage.pid", "v-bind:suggestions"="tagSuggestions", @add-tag="addTag", @remove-tag="removeTag")
    textarea("v-bind:value"="passage.text", @input="editPassage($event, passage.pid, 'text')")
</template>

<style lang="stylus">
    .passageEditor-tag
        margin-right: 1ex
        &::before
            content: '#'
</style>

<script>
    import {getCurrentPassage, tagSuggestionsCounted,} from '../vuex/getters';
    import {openPassage, editPassage, addTag, removeTag,} from '../vuex/actions';
    import TagList from './TagList.vue';
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