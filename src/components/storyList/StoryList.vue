<template lang="pug">
article.widget.lighter.screen.storyList
    .widget-header
        h2.widget-title List of stories
        .widget-controls
            sorter-buttons(:sort-properties="sortProperties", @sort="setStoriesSorting")
    .widget-body.storyList-body
        story-list-item(v-for="story of storiesList", :story="story", :key="story.ifid")

        story-add.storyListItem

    .widget-footer.widget-controlIcons
        router-link(:to="{name: 'settings'}")
            fa-icon(icon="cog")
            | Settings

        a(:href="bugs.url", target="_blank")
            fa-icon(icon="bug")
            | Report a bug
</template>

<script>
import {mapGetters, mapActions,} from 'vuex';

import StoryListItem from './StoryListItem.vue';
import SorterButtons from '../common/SorterButtons.vue';
import StoryAdd from './StoryAdd.vue';
import pkg from '../../../package.json';

export default {
    name: 'StoryList',

    components: {
        SorterButtons,
        StoryListItem,
        StoryAdd,
    },

    data() {
        return {
            sortProperties: [
                {field: 'lastEdit', name: 'Last edit',},
                {field: 'title', name: 'Title',},
                {field: 'passages', name: 'Passages #',},
            ],
            bugs: pkg.bugs,
        };
    },

    computed: mapGetters([
        'storiesList',
    ]),

    methods: mapActions([
        'setStoriesSorting',
    ]),
};
</script>

<style lang="stylus">
.storyList
    & > &-body
        padding-left: 1ex
        padding-right: 1ex
        flex-direction: row !important
        flex-wrap: wrap
        align-items: flex-start
        align-content: flex-start

    &-item
        size = 14em
        display: inline-block
        width: size * 1.62
        height: size
        overflow-y: auto
        margin: 0 1ex 1ex 0
        vertical-align: top
</style>