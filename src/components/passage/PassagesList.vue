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
                a(v-link="{name: 'passage', params: {pid: passage.pid}}", v-hilite-term="getPassagesFiltering") {{passage.title}}
                a(v-link="{name: 'deletePassage', params: {pid: passage.pid}}")
                    i.fa.fa-trash.activeIcon.danger.passagesList-remove
                i.fa.fa-rocket.activeIcon("@click"="makeStarting(passage.pid)", ":class"="{'disabled': passage.starting}")
                p(v-hilite-term="getPassagesFiltering") {{passage.text}}
</template>

<style lang="stylus">
.passagesList
    &-remove
        margin-left: 1ex

</style>

<script>
    import {setPassagesSorting,setPassagesFiltering, makeStarting,} from '../../vuex/actions';
    import {passagesOverview,getPassagesFiltering,} from '../../vuex/getters';
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

        vuex: {
            getters: {
                passagesOverview,
                getPassagesFiltering,
            },
            actions: {
                setPassagesSorting,
                setPassagesFiltering,
                makeStarting,
            },
        },

        components: {
            SorterButtons,
        },

        directives: {
            HiliteTerm,
        },
    };
</script>