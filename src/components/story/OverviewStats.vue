<template lang="pug">
story-stats.lighter(:stats="stats")
</template>

<script type="text/babel">
import {mapGetters,} from 'vuex';

import StoryStats from '../common/StoryStats.vue';

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