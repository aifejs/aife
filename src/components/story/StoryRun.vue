<template lang="pug">
    span.storyRun
        r-link(
            :to="route('play')",
            target="_blank",
            :class="{'disabled': !runnable}",
            title="Play story (in new window)"
        )
            fa-icon(icon="play")
        r-link(
            :to="route('debug')",
            target="_blank",
            :class="{'disabled': !runnable}",
            title="Debug story (in new window)"
        )
            fa-icon(icon="bug")
        r-link(:to="route('publish')", target="_blank", title="Export")
            fa-icon(icon="download")
</template>

<script>
import {isStoryRunnable,} from '../../vuex/getters';
import RLink from '../common/RLink.vue';

export default {
    name: 'StoryRun',

    components: {
        RLink,
    },

    props: {
        story: {
            type: Object,
            required: true,
        },
    },

    computed: {
        runnable() {
            return isStoryRunnable(this.story);
        },
    },

    methods: {
        route(name) {
            return {
                name,
                params: {
                    ifid: this.story.ifid,
                },
            };
        },
    },
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
