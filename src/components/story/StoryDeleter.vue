<template lang="pug">
article.deleteStory
    p Are you sure you want to delete story "{{ story.title }}"? This can't be undone.
    a(v-link="{name: 'stories'}") No, take me back
    button(@click="dropStory(story.ifid)") Yes, delete story completely and unrecoverably
</template>

<style lang="stylus"></style>

<script>
    import {deleteStory,} from '../../vuex/actions';
    import {getCurrentStory,} from '../../vuex/getters';
    import router from '../../router';

    export default {
        vuex: {
            actions: {
                deleteStory,
                dropStory(store, ifid) {
                    this.deleteStory(ifid);
                    router.go({name: 'stories',});
                },
            },

            getters: {
                story: getCurrentStory,
            },
        },
    };
</script>