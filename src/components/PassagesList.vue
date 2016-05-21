<template lang="pug">
    article.passagesList
        sorter-buttons("v-bind:sort-properties"="sortProperties", "@sort"="setPassagesSorting")
        input(type="search", "v-bind:value"="getPassagesFiltering", "@input"="setPassagesFiltering")
        ul.unstyled
            li(v-for="passage of passagesOverview")
                // we have to use @click to create a tab and we have to use v-link for routes to work
                a(v-link="{name: 'passage', params: {pid: passage.pid}}", v-hilite-term="getPassagesFiltering") {{passage.title}}
                a.btn.btn-xs.btn-danger(v-link="{name: 'deletePassage', params: {pid: passage.pid}}")
                    span.glyphicon.glyphicon-ban-circle
                p(v-hilite-term="getPassagesFiltering") {{passage.text}}
</template>

<style>
    .passagesList {
        border-top: 1px solid silver;
        border-bottom: 1px solid silver;
    }
</style>

<script>
    import {setPassagesSorting,setPassagesFiltering,} from '../vuex/actions';
    import {passagesOverview,getPassagesFiltering} from '../vuex/getters';
    import SorterButtons from './SorterButtons.vue';
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