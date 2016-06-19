<template lang="pug">
article.widget.screen.story(v-if="storiesLoaded")
    .widget-body
        passage-tabs
        router-view(v-if="story")
        p(v-if="!story")
            | No such story available. Have you changed IFID?&nbsp;
            a(v-link="{name: 'stories'}") To stories list
            | .

    story-footer.widget-footer.widget-controlIcons
div(v-if="!storiesLoaded")
    p.text-center Loading story, please wait...
        br
        i.fa.fa-spinner.fa-spin.fa-4x
</template>

<script type="module">
    import PassageTabs from '../common/AifeTabs/AifeTabs.vue';
    import StoryFooter from './StoryFooter.vue';
    import {getCurrentStory, getStoriesLoaded,} from '../../vuex/getters';

    export default {
        vuex: {
            getters: {
                story: getCurrentStory,
                storiesLoaded: getStoriesLoaded,
            },
        },

        components: {
            PassageTabs,
            StoryFooter,
        },
    };
</script>