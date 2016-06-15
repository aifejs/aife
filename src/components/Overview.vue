<script type="module">
    import OverviewStats from './OverviewStats.vue';
    import PassagesList from './PassagesList.vue';
    import pkg from '../../package.json';

    export default {
        name: 'overview',
        data() {
            return {
                bugs: pkg.bugs,
            }
        },
        components: {
            OverviewStats,
            PassagesList,
        },
    };
</script>

<style lang="stylus"></style>

<template lang="pug">
article.overview.widget
    .widget-header
        .widget-title
            | Story overview
            | &nbsp;
            a(v-link="{name: 'play'}", target="_blank", title="Run game (in new window)")
                i.fa.fa-play
        .widget-controls
            .widget-controlIcons
                a(v-link="{name: 'stylesheet'}", title="Edit styles")
                    i.fa.fa-css3
                a(v-link="{name: 'script'}", title="Edit script")
                    i.fa.fa-terminal
                a(v-link="{name: 'proofRead'}", title="Proof-read copy")
                    span.fa.fa-pencil-square-o
    .widget-body
        overview-stats
        br
        passages-list

    .widget-footer.widget-controlIcons
        //a()
        //    i.fa.fa-cog
        //    | Story settings

        a("v-bind:href"="bugs.url", target="_blank")
            i.fa.fa-bug
            | Report a bug
</template>