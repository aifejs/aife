<template></template>
<script>
    import {publishStory,} from './../../../lib/publishStory';
    import {mapGetters,} from 'vuex';
    export default {
        name: 'story-debug',
        mounted() {
            publishStory(this.story, {}, `${this.story.title}.html`);
        },

        computed: {
            ...mapGetters({
                story: 'getCurrentStory',
            }),
        },
    };
</script>