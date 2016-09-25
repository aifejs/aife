<template lang="pug">
.addStory
    .addStory-body
        button.addStory-btn("@click"="onAddStoryClick") Create new
        label.addStory-btn
            | Import from file
            input(type="file", "@change"="onFilePicked", accept=".html,.htm", multiple)
</template>

<style lang="stylus">
.addStory
    border: 1px solid silver
    border-radius 2px

    &-body
        display: flex
        flex-direction: column
        justify-content: space-around
        align-items: center
        width: 100%
        height: 100%

    &-btn
        position: relative
        width: 80%
        height: 40%
        border: 1px solid silver
        border-radius: 2px
        font-size: 150%
        background: none
        margin: 0
        padding: 0
        cursor: pointer
        overflow: hidden
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover
            background-color: gainsboro

        [type="file"]
            position: absolute
            top: 0
            right: 0
            bottom: 0
            left: 0
            opacity: 0
            cursor: pointer
</style>

<script>
    import {addStory,} from '../../vuex/actions';
    import {readFiles, importStories} from '../../lib/importStory';

    export default {
        methods: {
            onAddStoryClick(event) {
                this.addStory();
            },

            onFilePicked({target}) {
                if (target.files.length) {
                    readFiles(target.files)
                        .then(importStories)
                        .then(console.log.bind(console)).catch(console.error.bind(console));
                }
            }
        },

        vuex: {
            actions: {
                addStory,
            },
        },

        name: 'story-add',
    };
</script>