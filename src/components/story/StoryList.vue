<template lang="pug" src="../../templates/storyList.pug"></template>

<style lang="stylus" src="../../styles/storyList.styl"></style>

<script>
    import {storiesList,} from '../../vuex/getters';
    import {setStoriesSorting, addStory,} from '../../vuex/actions';

    import StoryListItem from './StoryListItem.vue';
    import SorterButtons from '../common/SorterButtons.vue';

    export default {
        name: 'story-list',

        data() {
            return {
                sortProperties: [
                    {field: 'lastEdit', name: 'Last edit',},
                    {field: 'title', name: 'Title',},
                    {field: 'passages', name: 'Passages #',},
                ],
            };
        },

        methods: {
            onAddStoryClick(event) {
                this.addStory();
            }
        },

        vuex: {
            getters: {
                storiesList,
            },
            actions: {
                setStoriesSorting,
                addStory,
            },
        },
        components: {
            SorterButtons,
            StoryListItem,
        },
    };
</script>