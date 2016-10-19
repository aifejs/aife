<template lang="pug">
story-stats("v-bind:stats"="stats").lighter
</template>

<script>
    import StoryStats from './common/StoryStats.vue';
    import {stats,} from '../vuex/getters';

    export default {
        name: 'overview-stats',
        vuex: {
            getters: {
                stats,
            },
        },
        components: {
            StoryStats,
        },
    };
</script>