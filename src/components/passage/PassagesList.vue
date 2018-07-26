<template lang="pug">
article.passagesList.widget.lighter
    .widget-header
        .widget-title Filter passages:&nbsp;
            input(type="search", :value="getPassagesFiltering", @input="setPassagesFiltering")
        .widget-controls
            sorter-buttons(:sort-properties="sortProperties", @sort="setPassagesSorting")
    .widget-body
        ul.passagesList-list
            li.passagesList-item(v-for="passage of passagesOverview", :class="{special: passage.special}")
                router-link(
                    :to="{name: 'passage', params: {pid: passage.pid, ifid}}",
                    v-hilite-term="getPassagesFiltering"
                ) {{passage.title}}
                span.actions
                    router-link.passagesList(:to="{name: 'deletePassage', params: {pid: passage.pid, ifid}}")
                        fa-icon.activeIcon.danger.passagesList-remove(icon="trash")
                    fa-icon.activeIcon(
                        icon="rocket",
                        @click="makeStarting(passage.pid)",
                        :class="{disabled: passage.starting}"
                    )
                p.passagesList-text(v-hilite-term="getPassagesFiltering", :title="passage.text") {{passage.text}}
</template>

<style lang="stylus">
.passagesList
    margin-top: 1ex

    &-remove
        margin-left: 1ex

    &-list
        padding-left: 0
        display: flex
        flex-direction: row
        flex-wrap: wrap

    &-item
        overflow: hidden
        height: 5.5em
        width: calc(20% - 1ex)
        margin-right: 1ex
        margin-bottom: 1ex

        .actions
            opacity: 0

        &:hover .actions
            opacity: 1

    &-text
        font-size: 80%
        white-space: pre-wrap

    .special
        font-weight: bold
</style>

<script>
import {mapGetters, mapActions,} from 'vuex';

import SorterButtons from '../common/SorterButtons.vue';
import HiliteTerm from '../../directives/HiliteTerm';

export default {
    name: 'PassagesList',

    components: {
        SorterButtons,
    },

    directives: {
        HiliteTerm,
    },

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
};
</script>