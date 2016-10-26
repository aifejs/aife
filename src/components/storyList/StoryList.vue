<template lang="pug" src="../../templates/storyList.pug"></template>

<style lang="stylus" src="../../styles/storyList.styl"></style>

<script>
    import {mapGetters, mapActions,} from 'vuex';

    import StoryListItem from './StoryListItem.vue';
    import SorterButtons from '../common/SorterButtons.vue';
    import StoryAdd from './StoryAdd.vue';
    import pkg from '../../../package.json';

    export default {
        name: 'story-list',

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

        components: {
            SorterButtons,
            StoryListItem,
            StoryAdd,
        },
    };
</script>