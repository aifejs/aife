<script>
    import {isStoryRunnable,} from '../../vuex/getters';
    import RLink from '../common/RLink.vue';

    export default {
        name: 'story-run',

        props: {
            story: Object,
        },

        computed: {
            runnable() {
                return isStoryRunnable(this.story);
            },
        },

        components: {
            RLink,
        },
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
    r-link(:to="{name: 'play', params: {ifid: story.ifid}}", target="_blank", :class="{'disabled': !runnable}", title="Play story (in new window)")
        i.fa.fa-play
    r-link(:to="{name: 'debug', params: {ifid: story.ifid}}", target="_blank", :class="{'disabled': !runnable}", title="Debug story (in new window)")
        i.fa.fa-bug
    r-link(:to="{name: 'publish', params: {ifid: story.ifid}}", target="_blank", title="Export")
        i.fa.fa-download
</template>

