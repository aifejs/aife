<template lang="pug">
passage-tabs
router-view
</template>

<script>
    import PassageTabs from '../common/AifeTabs/AifeTabs.vue';
    import StyleSheetEditor from '../StyleSheetEditor.vue';
    import ScriptEditor from '../ScriptEditor.vue';
    export default {
        components: {
            PassageTabs,
        },
    };
</script>