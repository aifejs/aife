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
                    span.glyphicon.glyphicon-film
                a(v-link="{name: 'script'}", title="Edit script")
                    span.glyphicon.glyphicon-list-alt
                a(v-link="{name: 'proofRead'}", title="Proof-read copy")
                    span.glyphicon.glyphicon-eye-open
    .widget-body
        overview-stats
        br
        passages-list
</template>