<template lang="pug">
article.passageEditor(v-if="passage")
    h2 {{passage.title}}
        small (\#{{passage.pid}})
    h3
        span.passageEditor-tag(v-for="tag of passage.tags") {{ tag }}
    textarea {{ passage.text }}
</template>

<style lang="stylus">
    .passageEditor-tag
        margin-right: 1ex
        &::before
            content: '#'
</style>

<script>
    import {getCurrentPassage,} from '../vuex/getters';
    export default {
        name: 'passage-editor',
        vuex: {
            getters: {
                passage: getCurrentPassage,
            },
        },
        route: {
            data(transition) {
                if (this.passage === undefined) {
                    transition.abort('no such passage');
                } else {
                    transition.next();
                }
            },
        },
    };
</script>