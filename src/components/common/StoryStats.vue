<template lang="pug">
article.storyStats.widget(:class="{longForm: longForm, shortForm: !longForm}")
    .widget-header
        .widget-title Story stats
        .widget-controls
            span.fa.storyStats-toggler(:class="{'fa-minus-square-o': longForm, 'fa-plus-square-o': !longForm}", @click="toggleLongForm", title="Show more/less")
    .widget-body
        dl.storyStats-list
            dt Passages:
            dd {{ stats.passages }}
            dt Words:
            dd {{ stats.words }}
            dt Characters:
            dd {{ stats.characters }}
            dt.longForm With spaces:
            dd.longForm {{ stats.charactersAll }}
            dt.longForm Code chars:
            dd.longForm {{ stats.code }}
</template>

<script>
export default {
    props: {
        stats: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            longForm: false,
        };
    },

    methods: {
        toggleLongForm() {
            this.longForm = !this.longForm;
        },
    },
};
</script>

<style lang="stylus">
.storyStats
    &.shortForm .longForm,
    &.longForm .shortForm
        display: none

    &-toggler
        cursor: pointer

    .storyStats-list
        margin-bottom: 0
        dt
            display: inline-block
            width: 8em
            text-align: right
            margin-right: 1ex
        dd
            display: inline
            margin: 0
            &::after
                display: block
                content: ''
</style>
