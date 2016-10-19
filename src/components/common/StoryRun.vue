<script>
    import {isStoryRunnable,} from '../../vuex/getters';

    export default {
        props: {
            story: Object,
        },

        computed: {
            runnable() {
                return isStoryRunnable(this.story);
            },
        },

        name: 'story-run',
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    a(v-link="{name: 'play', params: {ifid: story.ifid}}", target="_blank", ":class"="{'disabled': !runnable}", title="Play story (in new window)")
        i.fa.fa-play
    a(v-link="{name: 'debug', params: {ifid: story.ifid}}", target="_blank", ":class"="{'disabled': !runnable}", title="Debug story (in new window)")
        i.fa.fa-bug
    a(v-link="{name: 'publish', params: {ifid: story.ifid}}", target="_blank", title="Export")
        i.fa.fa-download
</template>

