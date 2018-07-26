<template lang="pug">
nav.passageTabs
    span.passageTabs-item.btn.back
        router-link(:to="{name: 'stories'}", title="Back to stories list") &lt;&lt;

    span.passageTabs-section(v-if="story")
        router-link.passageTabs-item.special(:to="{name: 'overview', params: {ifid: ifid}}", tag="span")
            a Overview

        special-tab(
            v-if="stylesheetEditing",
            route-name="stylesheet",
            title="Style",
            :close="closeStylesheetAndGoBack",
            :ifid="ifid"
        )
        special-tab(
            v-if="scriptEditing",
            route-name="script",
            title="Script",
            :close="closeScriptAndGoBack",
            :ifid="ifid"
        )
        special-tab(
            v-if="htmlEditing",
            route-name="html",
            title="HTML",
            :close="closeHtmlAndGoBack",
            :ifid="ifid"
        )
        special-tab(
            v-if="proofReadEditing",
            route-name="proofRead",
            title="Proof-read",
            :close="closeProofReadAndGoBack",
            :ifid="ifid"
        )

    span.passageTabs-section(v-if="story")
        router-link.passageTabs-item.passage(
            v-for="tab of tabs",
            :key="tab.pid",
            tag="span",
            :to="{name: 'passage', params: {pid: tab.pid, ifid}}"
        )
            a(:title="tabTitle(tab)") {{tab.title}}
            passage-tab-close(@click="closePassageAndGoBack(tab.pid)")

    span.passageTabs-section(v-if="story")
        span.passageTabs-item.btn.addPassage
            a(@click="addPassage") Add passage
</template>

<script>
import {mapGetters, mapActions,} from 'vuex';
import router from '../../router';
import SpecialTab from './SpecialTab.vue';
import PassageTabClose from '../common/PassageTabClose';

export default {
    name: 'PassageTabs',

    components: {
        PassageTabClose,
        SpecialTab,
    },

    computed: mapGetters({
        tabs: 'tabs',
        ifid: 'getCurrentIfid',
        stylesheetEditing: 'getEditStylesheet',
        scriptEditing: 'getEditScript',
        htmlEditing: 'getEditHtml',
        proofReadEditing: 'getProofRead',
        story: 'story',
    }),

    methods: {
        tabTitle({title, pid,}) {
            return `${title} #${pid}`;
        },

        gotoOverview() {
            router.push({name: 'overview', params: {ifid: this.ifid,},});
        },

        closeScriptAndGoBack() {
            this.gotoOverview();
            this.closeScript();
        },

        closeStylesheetAndGoBack() {
            this.gotoOverview();
            this.closeStylesheet();
        },

        closeHtmlAndGoBack() {
            this.gotoOverview();
            this.closeHtml();
        },

        closeProofReadAndGoBack() {
            this.gotoOverview();
            this.closeProofRead();
        },

        closePassageAndGoBack(pid) {
            this.gotoOverview();
            this.closePassage(pid);
        },

        ...mapActions([
            'addPassage',
            'closeScript',
            'closeStylesheet',
            'closeHtml',
            'closeProofRead',
            'closePassage',
        ]),
    },
};
</script>


<style lang="stylus">
@import '../../styles/colors.styl'

.passageTabs
    margin: 0 0 1ex 0
    padding: 1ex 0 0 0;
    border-bottom: 1px solid silver
    overflow-y: hidden
    min-height: 37px

    a, a:hover
        text-decoration: none

    &-section
        display: inline-block
        margin-right: 1ex

    &-item
        display: inline-block
        background-color: gainsboro
        border: 1px solid gainsboro
        border-radius: 4px 4px 0 0
        border-bottom: 0 none
        padding: 0.5ex 1ex
        margin-right: 1px
        vertical-align: top

        &.active
            background-color: white
            border: 1px solid silver
            border-bottom: 0 none

        &.special
            font-weight: bold

        &.btn
            cursor: pointer
            &.back
                margin-right: 1ex

        &.special + &.passage
            margin-left: 1ex

        a
            display: inline-block
            max-width: 12em
            vertical-align: top
            text-overflow: ellipsis
            overflow: hidden
            white-space: nowrap

    &-close
        display: inline-block
        margin-left: 1ex
        vertical-align: middle
        line-height: 14.3px

</style>