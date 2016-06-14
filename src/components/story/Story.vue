<template lang="pug">
passage-tabs
div(v-if="storiesLoaded")
    router-view(v-if="story")
    p(v-if="!story")
        | No such story available. Have you changed IFID?&nbsp;
        a(v-link="{name: 'stories'}") To stories list
        | .
div(v-if="!storiesLoaded")
    p.text-center Loading story, please wait...
        br
        i.fa.fa-spinner.fa-spin.fa-4x
</template>

<script type="module">
    import PassageTabs from '../common/AifeTabs/AifeTabs.vue';
    import {getCurrentStory, getStoriesLoaded,} from '../../vuex/getters';
    export default {
        components: {
            PassageTabs,
        },

        vuex: {
            getters: {
                story: getCurrentStory,
                storiesLoaded: getStoriesLoaded,
            },
        },
    };
</script>