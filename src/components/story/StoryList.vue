<template lang="pug">
article.storyList.widget.lighter
    .widget-header
        h2.widget-title List of stories
        .widget-controls
            sorter-buttons("v-bind:sort-properties"="sortProperties", "@sort"="setStoriesSorting")
    .widget-body
        div(v-if="storiesList.length")
            .widget.storyList-item(v-for="story of storiesList")
                .widget-header
                    a.widget-title(v-link="{name: 'story', params: {ifid: story.ifid}}") {{ story.title }}
                    .widget-controls
                        a(v-link="{name: 'proofRead', params: {ifid: story.ifid}}", title="Proof-read copy")
                            span.glyphicon.glyphicon-eye-open
                .widget-body
                    story-stats("v-bind:stats"="story.stats").lighter
</template>

<style lang="stylus">
    .storyList-item
        max-width: 20em
        display: inline-block
</style>

<script>
    import {storiesList,} from '../../vuex/getters';
    import {setStoriesSorting,} from '../../vuex/actions';
    import StoryStats from '../common/StoryStats.vue';
    import SorterButtons from '../common/SorterButtons.vue';

    export default {
        name: 'story-list',

        data() {
            return {
                sortProperties: [
                    {field: 'title', name: 'Title',},
                    {field: 'lastEdit', name: 'Last edit',},
                    {field: 'passages', name: 'Passages #',},
                ],
            };
        },

        vuex: {
            getters: {
                storiesList,
            },
            actions: {
                setStoriesSorting,
            },
        },
        components: {
            StoryStats,
            SorterButtons,
        },
    };
</script>