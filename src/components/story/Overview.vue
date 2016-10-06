<script>
    import OverviewStats from '../OverviewStats.vue';
    import PassagesList from '../passage/PassagesList.vue';
    import StoryRun from '../common/StoryRun.vue';
    import {getCurrentStory,} from '../../vuex/getters';
    import {formats,} from '../../lib/formatManager';

    export default {
        name: 'overview',
        vuex: {
            getters: {
                story: getCurrentStory,
            },
        },
        components: {
            OverviewStats,
            PassagesList,
            StoryRun,
        },
        data () {
            return {
                formats,
            }
        }
    };
</script>

<style lang="stylus">
.overview
    &-format
        height: 2em
        margin-right: 1em
</style>

<template lang="pug">
article.overview.widget
    .widget-header
        .widget-title
            img.overview-format("v-bind:src"="formats[story.format].iconUrl", ":title"="story.format")
            span.overview-title(v-text="story.title")
            | &nbsp;
            story-run("v-bind:story"="story")
        .widget-controls
            .widget-controlIcons
                a(v-link="{name: 'stylesheet'}", title="Edit styles")
                    i.fa.fa-css3
                a(v-link="{name: 'script'}", title="Edit script")
                    i.fa.fa-terminal
                a(v-link="{name: 'proofRead'}", title="Proof-read copy")
                    span.fa.fa-pencil-square-o
    .widget-body
        overview-stats
        br
        passages-list
</template>