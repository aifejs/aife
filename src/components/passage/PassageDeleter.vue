<template lang="pug">
article.deleteStory.deleter(v-if="passage")
    h3 Delete passage?
    p.deleter-notice Are you sure you want to delete passage #[strong \#{{ passage.pid }}] ({{ passage.title }})? This can't be undone.

    router-link.deleter-cancel(:to="{name: 'overview', params: {ifid: $route.params.ifid}}") No, take me back
    button.deleter-confirm(@click="dropPassage(passage.pid)") Yes, delete passage completely and unrecoverably
</template>

<script>
import {mapGetters, mapActions,} from 'vuex';
import router from '../../router';

export default {
    name: 'PassageDeleter',

    computed: mapGetters({
        passage: 'getCurrentPassage',
    }),

    methods: {
        dropPassage(pid) {
            this.deletePassage(pid);
            router.push({name: 'overview', params: {ifid: this.$route.params.ifid,},});
        },

        ...mapActions([
            'deletePassage',
        ]),
    },
};
</script>