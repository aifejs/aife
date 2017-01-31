<script>
    import OverviewStats from './OverviewStats.vue';
    import PassagesList from '../passage/PassagesList.vue';
    import StoryRun from './StoryRun.vue';
    import StoryEditCode from './StoryEditCode.vue';
    import PannableContainer from '../common/pannable/Container.vue';
    import {mapGetters,} from 'vuex';
    import {formats,} from '../../lib/formatManager';

    export default {
        name: 'overview',

        computed: mapGetters(['story',]),

        data() {
            return {
                formats,
            };
        },

        components: {
            OverviewStats,
            PassagesList,
            StoryRun,
            StoryEditCode,
            PannableContainer,
        },
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.overview
    &-format
        height: 2em
        margin-right: 1em
    &-header
        flex-shrink: 0
    &-title
        font-weight: bold
</style>

<template lang="pug">
article.overview.widget
    .widget-header.overview-header
        .widget-title
            img.overview-format("v-bind:src"="formats[story.format].iconUrl", ":title"="story.format")
            span.overview-title(v-text="story.title")
            | &nbsp;
            story-run("v-bind:story"="story")
        .widget-controls
            story-edit-code("v-bind:story"="story")
    .widget-body
        // pannable-container()
        overview-stats
        passages-list
</template>