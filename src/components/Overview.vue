<script>
    import OverviewStats from './OverviewStats.vue';
    import PassagesList from './PassagesList.vue';

    export default {
        name: 'overview',
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
        .widget-title Story overview
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
</template>