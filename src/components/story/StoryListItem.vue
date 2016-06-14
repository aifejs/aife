<template lang="pug" src="../../templates/storyListItem.pug"></template>

<style lang="stylus" src="../../styles/storyListItem.styl"></style>

<script type="module">
    import {editStoryTitle, duplicateStory,} from '../../vuex/actions';
    import StoryStats from '../common/StoryStats.vue';

    export default {
        props: {
            story: Object,
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
                    this.$els.input.focus();
                }
                this.editing = !this.editing;
            },
        },

        vuex: {
            actions: {
                editStoryTitle,
                duplicateStory,
                processTitleEdit(store, event) {
                    if (event.keyCode === 13) {
                        this.editStoryTitle(event.target.value, this.story.ifid);
                        this.editing = false;
                    } else if (event.keyCode === 27) {
                        this.editStoryTitle(this.oldTitle, this.story.ifid);
                        this.editing = false;
                    }
                },
                onBlur(store, event) {
                    this.editStoryTitle(event.target.value, this.story.ifid);
                    this.editing = false;
                },
            },
        },

        components: {
            StoryStats,
        },
    };
</script>