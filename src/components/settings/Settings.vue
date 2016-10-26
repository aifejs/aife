<template lang="pug">
.widget.lighter.screen
    .widget-header
        h2.widget-title Settings
    .widget-body
        p Various settings

    .widget-footer.widget-controlIcons
        router-link("v-bind:to"="{name: 'stories'}")
            i.fa.fa-list-ul
            | Back to stories
</template>

<script>
    export default {
    };
</script>