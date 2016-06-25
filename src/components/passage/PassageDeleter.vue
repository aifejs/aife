<template lang="pug">
article.deleteStory.deleter(v-if="passage")
    h3 Delete passage?
    p Are you sure you want to delete passage&nbsp;
        strong \#{{ passage.pid }} ({{ passage.title }})
        | ? This can't be undone.
    a.deleter-cancel(v-link="{name: 'overview'}") No, take me back
    button.deleter-confirm(@click="dropPassage(passage.pid)") Yes, delete passage completely and unrecoverably
</template>

<script>
    import {deletePassage,} from '../../vuex/actions';
    import {getCurrentPassage,} from '../../vuex/getters';
    import router from '../../router';

    export default {
        name: 'passage-deleter',
        methods: {
            dropPassage(pid) {
                this.deletePassage(pid);
                router.go({
                    name: 'overview',
                });
            },
        },

        vuex: {
            actions: {
                deletePassage,
            },
            getters: {
                passage: getCurrentPassage,
            },
        },
    };
</script>