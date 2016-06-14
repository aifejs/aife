<template lang="pug">
story-stats("v-bind:stats"="stats").lighter
</template>

<style lang="stylus"></style>

<script type="module">
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