<template lang="pug">
span.aifeTabs-item.special(v-link-active)
    a(v-link="{name: routeName}", v-text="title")
    i.fa.fa-times-circle.activeIcon.danger.aifeTabs-close("@click"="close")
</template>

<script>
    export default {
        name: 'special-tab',

        props: {
            title: String,
            routeName: String,
            close: Function,
        },
    };
</script>