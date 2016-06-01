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
                // we have to use @click to create a tab and we have to use v-link for routes to work
                a(v-link="{name: 'passage', params: {pid: passage.pid}}", v-hilite-term="getPassagesFiltering") {{passage.title}}
                a(v-link="{name: 'deletePassage', params: {pid: passage.pid}}")
                    i.fa.fa-trash.activeIcon.danger.passagesList-remove
                p(v-hilite-term="getPassagesFiltering") {{passage.text}}
</template>

<style lang="stylus">
.passagesList
    &-remove
        margin-left: 1ex

</style>

<script>
    import {setPassagesSorting,setPassagesFiltering,} from '../vuex/actions';
    import {passagesOverview,getPassagesFiltering,} from '../vuex/getters';
    import SorterButtons from './common/SorterButtons.vue';
    import HiliteTerm from '../directives/HiliteTerm';

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