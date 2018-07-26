<template lang="pug">
.widget-controlIcons.storyCode
    router-link(:to="{name: 'stylesheet', params: {ifid: story.ifid}}", title="Edit styles")
        fa-icon(:icon="['fab', 'css3']")
    router-link(:to="{name: 'script', params: {ifid: story.ifid}}", title="Edit script")
        fa-icon(:icon="['fab', 'js']")
    router-link(:to="{name: 'html', params: {ifid: story.ifid}}", title="Edit html")
        fa-icon(:icon="['fab', 'html5']")
    router-link(:to="{name: 'proofRead', params: {ifid: story.ifid}}", title="Proof-read copy")
        fa-icon(icon="edit")
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