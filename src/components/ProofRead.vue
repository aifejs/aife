<template lang="pug">
article.proofRead
    p Editing story in proof-read mode is experimental feature, it's good idea to make duplicate of the story before. Be
        | careful not to delete special characters. In case Aife fails to parse something, text will be put into special paragraph.

    label Story title
        br
        input(placeholder="Story title", required, "v-bind:value"="proofReadCopy.title", @input="editTitle")
    label
        textarea.codeArea("v-bind:value"="proofReadCopy.passages", @input="updateStoryFromProof")
</template>

<style lang="stylus">
.proofRead
    label
        display: block
        font-weight: normal
    textarea
        width: 100%
        height: 400px
        font-weight: normal
</style>

<script type="module">
    import {proofReadCopy,} from '../vuex/getters';
    import {updateStoryFromProof, openProofRead, editStoryTitle,} from '../vuex/actions';

    export default {
        name: 'proof-read',

        methods: {
            editTitle(event) {
                this.editStoryTitle(event.target.value.trim(), this.proofReadCopy.ifid);
            },
        },

        vuex: {
            getters: {
                proofReadCopy,
            },
            actions: {
                updateStoryFromProof,
                openProofRead,
                editStoryTitle,
            },
        },

        route: {
            data(transition) {
                this.openProofRead();

                transition.next();
            },
        },
    }
</script>