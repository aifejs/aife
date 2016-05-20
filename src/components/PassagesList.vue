<template lang="pug">
    article.passagesList
        sorter-buttons("v-bind:sort-properties"="sortProperties", "@sort"="setPassagesSorting")
        ul.unstyled
            li(v-for="passage of passagesOverview")
                // we have to use @click to create a tab and we have to use v-link for routes to work
                a(v-link="{name: 'passage', params: {pid: passage.pid}}", "@click"="openPassage(passage.pid)") {{passage.title}}
                a.btn.btn-xs.btn-danger(v-link="{name: 'deletePassage', params: {pid: passage.pid}}")
                    span.glyphicon.glyphicon-ban-circle
                p {{passage.text}}
</template>

<style>
    .passagesList {
        border-top: 1px solid silver;
        border-bottom: 1px solid silver;
    }
</style>

<script>
    import {openPassage,setPassagesSorting,} from '../vuex/actions';
    import {passagesOverview,} from '../vuex/getters';
    import SorterButtons from './SorterButtons.vue';

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
            },
            actions: {
                setPassagesSorting,
            },
        },

        components: {
            SorterButtons,
        },
    };
</script>