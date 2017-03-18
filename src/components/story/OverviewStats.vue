<template lang="pug">
story-stats.lighter(:stats="stats")
</template>

<script type="text/babel">
    import StoryStats from '../common/StoryStats.vue';
    import {mapGetters,} from 'vuex';

    export default {
        name: 'overview-stats',
        computed: mapGetters([
            'stats',
        ]),
        components: {
            StoryStats,
        },
    };
</script>