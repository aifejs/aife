<template lang="pug">
article.widget.screen.story
    .widget-body.story-body(v-if="storiesLoaded")
        passage-tabs
        router-view
        p(v-if="!story")
            | No such story available. Have you changed IFID? #[router-link(:to="{name: 'stories'}") To stories list].

    story-footer.widget-footer.widget-controlIcons(v-if="storiesLoaded")
    .widget-body(v-if="!storiesLoaded")
        p.text-center Loading story, please wait...
            br
            fa-icon(icon="spinner", spin, size="4x")
</template>

<style lang="stylus">
.story
    &-body
        padding-top: 0
</style>

<script>
import {mapGetters,} from 'vuex';

import PassageTabs from './PassageTabs.vue';
import StoryFooter from './StoryFooter.vue';

export default {
    components: {
        PassageTabs,
        StoryFooter,
    },

    computed: mapGetters({
        story: 'story',
        storiesLoaded: 'getStoriesLoaded',
    }),
};
</script>