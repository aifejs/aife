<script>
    import {passagesOverview,} from '../vuex/getters';
    import {openPassage,} from '../vuex/actions';
    import StoryStats from './StoryStats.vue';

    export default {
        name: 'overview',
        vuex: {
            getters: {
                passagesOverview,
            },

            actions: {
                openPassage,
            },
        },
        components: {
            StoryStats,
        },
    };
</script>

<template lang="pug">
article.overview
    h1 Story overview
    story-stats
    a(v-link="{name: 'proofRead'}") Proof-read
    ul.unstyled
        li(v-for="passage of passagesOverview")
            // we have to use @click to create a tab and we have to use v-link for routes to work
            a(v-link="{name: 'passage', params: {pid: passage.pid}}", "@click"="openPassage(passage.pid)") {{passage.title}}
            a.btn.btn-xs.btn-danger(v-link="{name: 'deletePassage', params: {pid: passage.pid}}")
                span.glyphicon.glyphicon-ban-circle
            p {{passage.text}}
    router-view
</template>

<style lang="stylus">
    .overview
        color: silver

        li.opened
            font-weight: bold
</style>

