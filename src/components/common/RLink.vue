<template lang="pug">
a(:href="lnk")
    slot
</template>

<script>
// vue-router v2 doesn't support target="_blank"
// so we create this component and hope VueRouter#match will not disappear
export default {
    name: 'RLink',
    props: {
        to: {
            type: Object,
            required: true,
        },
    },

    computed: {
        lnk() {
            const resolved = this.$router.match(this.to);
            let path = resolved.fullPath;

            if (this.$router.mode === 'hash') {
                path = `#${path}`;
            }

            return path;
        },
    },
};
</script>