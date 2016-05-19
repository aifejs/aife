<template lang="pug">
dl.dl-horizontal
    dt Passages:
    dd {{stats.passages}}
    dt Words:
    dd {{stats.words}}
    dt Characters:
    dd {{stats.characters}}
</template>

<style lang="stylus"></style>

<script>
    import {stats,} from '../vuex/getters';

    export default {
        name: 'story-stats',
        vuex: {
            getters: {
                stats,
            },
        },
    };
</script>