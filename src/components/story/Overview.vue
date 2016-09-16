<script>
    import OverviewStats from '../OverviewStats.vue';
    import PassagesList from '../passage/PassagesList.vue';
    import StoryRun from '../common/StoryRun.vue';
    import {getCurrentStory,} from '../../vuex/getters';

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
    };
</script>

<style lang="stylus"></style>

<template lang="pug">
article.overview.widget
    .widget-header
        .widget-title
            | Story overview
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