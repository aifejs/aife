<template lang="pug">
.widget.lighter.screen
    .widget-header
        h2.widget-title Settings
    .widget-body
        p Various settings

    .widget-footer.widget-controlIcons
        a(v-link="{name: 'stories'}")
            i.fa.fa-list-ul
            | Back to stories
</template>

<style lang="stylus"></style>

<script>
    export default {
        vuex: {
        },
    };
</script>