<template lang="pug">
.sorterButtons
    span.sorterButtons-title Sort by:
    .sorterButtons-grp
        button.sorterButtons-btn(v-for="sortProperty of sortProperties", "v-bind:class"="{active: sortProperty.field === activeProperty.field}", "@click"="changeSort(sortProperty)")
            | {{ sortProperty.name }}
            span.sorterButtons-sort(v-sort-icon="activeProperty.sort")
</template>

<style lang="stylus" src="../../styles/sorterButtons.styl"></style>

<script type="module">
    import SortIcon from '../../directives/SortIcon';

    export default {
        name: 'sorter-buttons',

        props: {
            sortProperties: Array,
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

        directives: {
            SortIcon,
        },
    };
</script>