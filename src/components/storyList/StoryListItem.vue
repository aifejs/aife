<template lang="pug">
.widget.storyList-item
    .widget-header
        .widget-title(:title="story.title", :class="{editing: editing}")
            router-link.storyListItem-link(:to="{name: 'overview', params: {ifid: story.ifid}}") {{ story.title }}
            input.storyListItem-input(
                :value.once="story.title",
                @keydown="processTitleEdit",
                @blur="onBlur",
                ref="input"
            )
            fa-icon.activeIcon.storyListItem-editBtn(icon="pencil-alt", @click="toggleEditing", title="Rename story")
        .widget-controls
            .widget-controlIcons
                fa-icon.activeIcon(icon="copy", title="Duplicate story", @click="duplicateStory(story.ifid)")
                router-link(:to="{name: 'deleteStory', params: {ifid: story.ifid}}", title="Delete story")
                    fa-icon.activeIcon.danger(icon="trash")
                router-link(:to="{name: 'proofRead', params: {ifid: story.ifid}}", title="Proof-read mode")
                    fa-icon(icon="edit")
    .widget-body
        story-stats(:stats="story.stats").lighter
    .widget-footer
        .widget-controls
            .widget-controlIcons
                story-run(:story="story")
</template>

<script>
import {mapActions,} from 'vuex';

import StoryStats from '../common/StoryStats.vue';
import StoryRun from '../story/StoryRun.vue';

export default {

    components: {
        StoryStats,
        StoryRun,
    },
    props: {
        story: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            editing: false,
            oldTitle: '',
        };
    },

    methods: {
        toggleEditing() {
            if (!this.editing) {
                this.oldTitle = this.story.title;
                this.$refs.input.focus();
            }
            this.editing = !this.editing;
        },

        processTitleEdit({target, keyCode,}) {
            if (keyCode === 13) {
                this.editStoryTitle({
                    title: target.value,
                    ifid: this.story.ifid,
                });
                this.editing = false;
            } else if (keyCode === 27) {
                this.editStoryTitle({
                    title: this.oldTitle,
                    ifid: this.story.ifid,
                });
                this.editing = false;
            }
        },

        onBlur({target,}) {
            this.editStoryTitle({
                title: target.value,
                ifid: this.story.ifid,
            });
            this.editing = false;
        },

        ...mapActions([
            'editStoryTitle',
            'duplicateStory',
        ]),
    },
};
</script>

<style lang="stylus">
.storyListItem
    size = 14em
    display: flex
    width: size * 1.62
    height: size
    overflow-y: auto
    margin-right: 1ex
    vertical-align: top

    &-input
        display: none
        width: 12em
        background: white
        border: 1px solid gray

        .editing &
            display: inline-block

    &-link
        display: inline-block
        width: 12em
        overflow: hidden
        vertical-align: middle
        white-space: nowrap
        text-overflow: ellipsis

        .editing &
            display: none

    &-editBtn
        margin-left: 0.5ex
</style>