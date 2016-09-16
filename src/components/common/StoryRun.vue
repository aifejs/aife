<script>
    import {isStoryRunnable,} from '../../vuex/getters';

    export default {
        props: {
            story: Object,
        },
        vuex: {
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
    &.disabled
        pointer-events: none
        opacity: 0.3
</style>

<template lang="pug">
span.storyRun(":class"="{'disabled': runnable}")
    a(v-link="{name: 'play', params: {ifid: story.ifid}}", target="_blank", title="Run game (in new window)")
        i.fa.fa-play
    a(v-link="{name: 'publish', params: {ifid: story.ifid}}", target="_blank", title="Download (also export)")
        i.fa.fa-download
</template>

