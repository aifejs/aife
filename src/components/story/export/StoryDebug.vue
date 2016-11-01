<template></template>
<script>
    import {playStory,} from './../../../lib/publishStory';
    import {mapGetters,} from 'vuex';
    export default {
        name: 'story-debug',
        mounted() {
            playStory(this.story, {formatOptions: ['debug',],});
        },

        computed: {
            ...mapGetters(['story',]),
        },
    };
</script>