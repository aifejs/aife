<template lang="pug">
.widget-controlIcons.storyCode
    a(v-link="{name: 'stylesheet', params: {ifid: story.ifid}}", title="Edit styles")
        i.fa.fa-css3
    a(v-link="{name: 'script', params: {ifid: story.ifid}}", title="Edit script")
        i.fa.fa-terminal
    a(v-link="{name: 'html', params: {ifid: story.ifid}}", title="Edit html")
        i.fa.fa-code
    a(v-link="{name: 'proofRead', params: {ifid: story.ifid}}", title="Proof-read copy")
        i.fa.fa-pencil-square-o
</template>

<script>
    export default {
        props: {
            story: Object,
        },

        vuex: {
        },

        name: 'story-edit-code'
    };
</script>