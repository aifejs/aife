<template lang="pug">
article.storyStats.widget(:class="widgetClass")
    .widget-header
        .widget-title Story stats
        .widget-controls
            fa-icon.activeIcon(:icon="togglerIcon", @click="toggleLongForm", title="Show more/less")
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

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
        stats: Object,
    },
})
export default class StoryStats extends Vue {
    public longForm = false;

    get togglerIcon() {
        return this.longForm ? 'minus-square' : 'plus-square';
    }

    get widgetClass() {
        return {
            longForm: this.longForm,
            shortForm: !this.longForm,
        };
    }

    public toggleLongForm() {
        this.longForm = !this.longForm;
    }
}
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
