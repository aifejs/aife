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
    import {openPassage} from '../vuex/actions';
    export default {
        name: 'passage-editor',
        vuex: {
            getters: {
                passage: getCurrentPassage,
            },
            actions: {
                openPassage,
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
    };
</script>