<script>
    import StoryStats from './StoryStats.vue';
    import PassagesList from './PassagesList.vue';
    import StyleSheetEditor from './StyleSheetEditor.vue';
    import ScriptEditor from './ScriptEditor.vue';

    export default {
        name: 'overview',
        components: {
            StoryStats,
            PassagesList,
            StyleSheetEditor,
            ScriptEditor,
        },
    };
</script>

<template lang="pug">
article.overview
    h1 Story overview
    story-stats
    passages-list
    style-sheet-editor
    script-editor
    a(v-link="{name: 'proofRead'}") Proof-read
    router-view
</template>