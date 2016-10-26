<template lang="pug" src="../../templates/storyListItem.pug"></template>

<style lang="stylus" src="../../styles/storyListItem.styl"></style>

<script>
    import {mapActions,} from 'vuex';
    import StoryStats from '../common/StoryStats.vue';
    import StoryRun from '../story/StoryRun.vue';

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

        components: {
            StoryStats,
            StoryRun,
        },
    };
</script>