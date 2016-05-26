<template lang="pug">
article.storyStats.widget("v-bind:class"="{longForm: longForm, shortForm: !longForm}")
    .widget-header
        .widget-title Story stats
        .widget-controls
            span.glyphicon.storyStats-toggler("v-bind:class"="{'glyphicon-collapse-down': longForm, 'glyphicon-expand': !longForm}", @click="toggleLongForm", title="Show more/less")
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

<style lang="stylus" src="../../styles/storyStats.styl"></style>

<script>
    export default {
        props: {
            stats: Object,
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