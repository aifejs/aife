<template lang="pug">
article.passageEditor(v-if="passage")
    input(placeholder="Passage title", required, "v-bind:value"="passage.title", @input="editPassage($event, passage.pid, 'title')")
    small (\#{{passage.pid}})
    h3
        span.passageEditor-tag(v-for="tag of passage.tags") {{ tag }}
        input(list="passage-tags-{{passage.pid}}")
    textarea("v-bind:value"="passage.text", @input="editPassage($event, passage.pid, 'text')")
    datalist(id="passage-tags-{{passage.pid}}")
        option(v-for="tag of tagSuggestions", value="{{ tag }}")
</template>

<style lang="stylus">
    .passageEditor-tag
        margin-right: 1ex
        &::before
            content: '#'
</style>

<script>
    import {getCurrentPassage, tagSuggestions,} from '../vuex/getters';
    import {openPassage, editPassage,} from '../vuex/actions';
    export default {
        name: 'passage-editor',
        vuex: {
            getters: {
                passage: getCurrentPassage,
                tagSuggestions,
            },
            actions: {
                openPassage,
                editPassage,
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
    };
</script>