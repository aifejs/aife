<template></template>
<script>
    import {playStory,} from './../../../lib/publishStory';
    import {mapGetters,} from 'vuex';
    export default {
        name: 'story-play',
        mounted() {
            playStory(this.story, {});
        },

        computed: {
            ...mapGetters(['story',]),
        },
    };
</script>