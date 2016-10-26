<template lang="pug">
.widget-controlIcons.storyCode
    router-link("v-bind:to"="{name: 'stylesheet', params: {ifid: story.ifid}}", title="Edit styles")
        i.fa.fa-css3
    router-link("v-bind:to"="{name: 'script', params: {ifid: story.ifid}}", title="Edit script")
        i.fa.fa-terminal
    router-link("v-bind:to"="{name: 'html', params: {ifid: story.ifid}}", title="Edit html")
        i.fa.fa-code
    router-link("v-bind:to"="{name: 'proofRead', params: {ifid: story.ifid}}", title="Proof-read copy")
        i.fa.fa-pencil-square-o
</template>

<script>
    export default {
        props: {
            story: Object,
        },

        name: 'story-edit-code',
    };
</script>