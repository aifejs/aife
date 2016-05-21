<script>
    import StoryStats from './StoryStats.vue';
    import PassagesList from './PassagesList.vue';
    import StyleSheetEditor from './StyleSheetEditor.vue';

    export default {
        name: 'overview',
        components: {
            StoryStats,
            PassagesList,
            StyleSheetEditor,
        },
    };
</script>

<template lang="pug">
article.overview
    h1 Story overview
    story-stats
    passages-list
    style-sheet-editor
    a(v-link="{name: 'proofRead'}") Proof-read
    router-view
</template>