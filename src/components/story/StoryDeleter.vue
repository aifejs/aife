<template lang="pug">
article.deleteStory.deleter(v-if="story")
    h3 Delete story?
    p.deleter-notice Are you sure you want to delete story #[strong "{{ story.title }}"]? This can't be undone.

    router-link.deleter-cancel("v-bind:to"="{name: 'stories'}") No, take me back
    button.deleter-confirm(@click="dropStory(story.ifid)") Yes, delete story completely and unrecoverably
</template>

<script>
    import {mapGetters, mapActions,} from 'vuex';
    import router from '../../router';

    export default {
        name: 'story-deleter',

        methods: {
            dropStory(ifid) {
                this.deleteStory(ifid);
                router.push({name: 'stories',});
            },

            ...mapActions([
                'deleteStory',
            ]),
        },

        computed: mapGetters(['story',]),
    };
</script>