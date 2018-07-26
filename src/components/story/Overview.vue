<template lang="pug">
    article.overview.widget
        .widget-header.overview-header
            .widget-title
                img.overview-format(:src="formats[story.format].iconUrl", :title="story.format")
                span.overview-title(v-text="story.title")
                | &nbsp;
                story-run(:story="story")
            .widget-controls
                story-edit-code(:story="story")
        .widget-body
            // pannable-container(:passages="story.passages", style="width: 100%; height: 500px")
            overview-stats
            passages-list
</template>

<script>
import {mapGetters,} from 'vuex';

import OverviewStats from './OverviewStats.vue';
import StoryRun from './StoryRun.vue';
import StoryEditCode from './StoryEditCode.vue';

import PassagesList from '../passage/PassagesList.vue';
import PannableContainer from '../common/pannable/Container.vue';
import {formats,} from '../../lib/formatManager';

export default {
    name: 'Overview',
    components: {
        OverviewStats,
        PassagesList,
        StoryRun,
        StoryEditCode,
        PannableContainer,
    },

    data() {
        return {
            formats,
        };
    },

    computed: mapGetters(['story',]),
};
</script>

<style lang="stylus">
.overview
    &-format
        height: 2em
        margin-right: 1em
    &-header
        flex-shrink: 0
    &-title
        font-weight: bold
</style>