<template lang="pug">
article.deleteStory.deleter
    h3 Delete story?
    p.deleter-notice Are you sure you want to delete story&nbsp;
        strong "{{ story.title }}"
        | ? This can't be undone.
    a.deleter-cancel(v-link="{name: 'stories'}") No, take me back
    button.deleter-confirm(@click="dropStory(story.ifid)") Yes, delete story completely and unrecoverably
</template>

<script type="module">
    import {deleteStory,} from '../../vuex/actions';
    import {getCurrentStory,} from '../../vuex/getters';
    import router from '../../router';

    export default {
        methods: {
            dropStory(ifid) {
                this.deleteStory(ifid);
                router.go({name: 'stories',});
            },
        },

        vuex: {
            actions: {
                deleteStory,
            },

            getters: {
                story: getCurrentStory,
            },
        },
    };
</script>