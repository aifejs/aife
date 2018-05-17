<template lang="pug">
.widget-controlIcons.storyCode
    router-link(:to="{name: 'stylesheet', params: {ifid: story.ifid}}", title="Edit styles")
        i.fa.fa-css3
    router-link(:to="{name: 'script', params: {ifid: story.ifid}}", title="Edit script")
        i.fa.fa-terminal
    router-link(:to="{name: 'html', params: {ifid: story.ifid}}", title="Edit html")
        i.fa.fa-code
    router-link(:to="{name: 'proofRead', params: {ifid: story.ifid}}", title="Proof-read copy")
        i.fa.fa-pencil-square-o
</template>

<script>
export default {

    name: 'StoryEditCode',
    props: {
        story: {
            type: Object,
            required: true,
        },
    },
};
</script>