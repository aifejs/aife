<template lang="pug">
.sorterButtons
    span.sorterButtons-title Sort by:
    .sorterButtons-grp
        button.sorterButtons-btn(
            v-for="sortProperty of sortProperties",
            :class="{active: sortProperty.field === activeProperty.field}",
            @click="changeSort(sortProperty)"
        )
            | {{ sortProperty.name }}
            fa-icon(:icon="activeProperty.sort === 'asc' ? 'sort-amount-up' : 'sort-amount-down'")
</template>

<script>
export default {
    name: 'SorterButtons',

    props: {
        sortProperties: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            activeProperty: {
                field: this.sortProperties[0].field,
                sort: 'desc',
            },
        };
    },

    methods: {
        changeSort(sortProperty) {
            const sort = this.activeProperty.sort;
            if (sortProperty.field === this.activeProperty.field) {
                if (sort === 'desc') {
                    this.activeProperty.sort = 'asc';
                } else {
                    this.activeProperty.sort = 'desc';
                }
            } else {
                this.activeProperty.field = sortProperty.field;
                this.activeProperty.sort = sort;
            }

            // we need to clone sort object or we gonna mutate state directly
            this.$emit('sort', Object.assign({}, this.activeProperty));
        },
    },
};
</script>

<style lang="stylus">
.sorterButtons
    &-title
        margin-right: 1ex

    &-sort
        display: inline-block
        margin-left: 1ex

    &-grp
        display: inline-block

    &-btn
        width: 8em
        line-height: 2em
        display: inline-block
        border: 0 none
        background: lightgrey

        &:first-child
            border-radius: 4px 0 0 4px
        &:last-child
            border-radius: 0 4px 4px 0

        &.active
            background-color: silver
</style>
