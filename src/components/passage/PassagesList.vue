<template lang="pug">
article.passagesList.widget.lighter
    .widget-header
        .widget-title Filter passages:&nbsp;
            input(type="search", "v-bind:value"="getPassagesFiltering", "@input"="setPassagesFiltering")
        .widget-controls
            sorter-buttons("v-bind:sort-properties"="sortProperties", "@sort"="setPassagesSorting")
    .widget-body
        ul.unstyled
            li(v-for="passage of passagesOverview")
                router-link("v-bind:to"="{name: 'passage', params: {pid: passage.pid, ifid: ifid}}", v-hilite-term="getPassagesFiltering") {{passage.title}}
                router-link("v-bind:to"="{name: 'deletePassage', params: {pid: passage.pid, ifid: ifid}}")
                    i.fa.fa-trash.activeIcon.danger.passagesList-remove
                i.fa.fa-rocket.activeIcon("@click"="makeStarting(passage.pid)", ":class"="{'disabled': passage.starting}")
                p(v-hilite-term="getPassagesFiltering") {{passage.text}}
</template>

<style lang="stylus" rel="stylesheet/stylus">
.passagesList
    &-remove
        margin-left: 1ex
</style>

<script>
    import {mapGetters, mapActions,} from 'vuex';
    import SorterButtons from '../common/SorterButtons.vue';
    import HiliteTerm from '../../directives/HiliteTerm';

    export default {
        name: 'passages-list',

        data() {
            return {
                sortProperties: [
                    {field: 'pid', name: 'Passage id',},
                    {field: 'title', name: 'Title',},
                ],
            };
        },

        computed: mapGetters({
            ifid: 'getCurrentIfid',
            passagesOverview: 'passagesOverview',
            getPassagesFiltering: 'getPassagesFiltering',
        }),

        methods: mapActions([
            'setPassagesSorting',
            'setPassagesFiltering',
            'makeStarting',
        ]),

        components: {
            SorterButtons,
        },

        directives: {
            HiliteTerm,
        },
    };
</script>