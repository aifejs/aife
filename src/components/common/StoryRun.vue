<script>
    import {isStoryRunnable,} from '../../vuex/getters';

    export default {
        props: {
            story: Object,
        },

        computed: {
            runnable () {
                return isStoryRunnable(this.story)
            },
        },

        name: 'story-run',
    };
</script>

<style lang="stylus">
.storyRun
    a
        margin-left: 1ex
        i
            margin-right: 1ex
    .disabled
        pointer-events: none
        opacity: 0.3
</style>

<template lang="pug">
span.storyRun
    a(v-link="{name: 'play', params: {ifid: story.ifid}}", target="_blank", ":class"="{'disabled': !runnable}", title="Run game (in new window)")
        i.fa.fa-play
    a(v-link="{name: 'publish', params: {ifid: story.ifid}}", target="_blank", title="Export")
        i.fa.fa-download
</template>

