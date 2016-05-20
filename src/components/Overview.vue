<script>
    import StoryStats from './StoryStats.vue';
    import PassagesList from './PassagesList.vue';

    export default {
        name: 'overview',
        components: {
            StoryStats,
            PassagesList,
        },
    };
</script>

<template lang="pug">
article.overview
    h1 Story overview
    story-stats
    passages-list
    a(v-link="{name: 'proofRead'}") Proof-read
    router-view
</template>