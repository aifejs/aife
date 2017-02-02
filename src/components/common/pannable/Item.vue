<script>
export default {
    name: 'pannable-item',

    props: {
        x: Number,
        y: Number,
    },
};
</script>

<template lang="pug">
.pannable-item(tabindex="0", ":style"="{}")
</template>

<style lang="stylus" rel="stylesheet/stylus">
itemHeight = 40px
itemWidth = 60px

.pannable
    &-item
        position: absolute
        width: itemWidth
        height: itemHeight
        outline: 2px solid olive
        top: 0px
        left: 0px
        &:focus
            outline: 2px solid navy
</style>