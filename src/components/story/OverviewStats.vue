<template lang="pug">
story-stats.lighter(:stats="stats")
</template>

<script type="text/babel">
import StoryStats from '../common/StoryStats.vue';
import {mapGetters,} from 'vuex';

export default {
    name: 'OverviewStats',

    components: {
        StoryStats,
    },

    computed: mapGetters([
        'stats',
    ]),
};
</script>