<template lang="pug">
router-link.passageTabs-item.special(tag="span", "v-bind:to"="{name: routeName, params: {ifid: ifid}}")
    a(v-text="title")
    i.fa.fa-times-circle.activeIcon.danger.passageTabs-close("@click"="close")
</template>

<script>
    export default {
        name: 'special-tab',

        props: {
            title: String,
            routeName: String,
            close: Function,
            ifid: String,
        },
    };
</script>