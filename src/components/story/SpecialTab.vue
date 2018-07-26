<template lang="pug">
router-link.passageTabs-item.special(tag="span", :to="{name: routeName, params: {ifid: ifid}}")
    a(v-text="title")
    passage-tab-close(@click="close")
</template>

<script>
import PassageTabClose from '../common/PassageTabClose';

export default {
    name: 'SpecialTab',

    components: {
        PassageTabClose,
    },

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