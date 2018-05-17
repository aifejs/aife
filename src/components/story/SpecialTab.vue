<template lang="pug">
router-link.passageTabs-item.special(tag="span", :to="{name: routeName, params: {ifid: ifid}}")
    a(v-text="title")
    i.fa.fa-times-circle.activeIcon.danger.passageTabs-close(@click="close")
</template>

<script>
export default {
    name: 'SpecialTab',

    props: {
        title: {
            type: String,
            required: true,
        },
        routeName: {
            type: String,
            required: true,
        },
        close: {
            type: Function,
            required: true,
        },
        ifid: {
            type: String,
            required: true,
        },
    },
};
</script>