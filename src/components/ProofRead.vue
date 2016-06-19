<template lang="pug">
article.codeEditor
    p.
        Editing story in proof-read mode is experimental feature, it's good idea to make duplicate of the story before.
        Be careful not to delete special characters. In case Aife fails to parse something, text will be put into special paragraph.

    label.codeArea
        textarea.codeArea("v-bind:value"="proofReadCopy.passages", @input="updateStoryFromProof")
</template>

<style lang="stylus">

</style>

<script>
    import {proofReadCopy,} from '../vuex/getters';
    import {updateStoryFromProof, openProofRead,} from '../vuex/actions';

    export default {
        name: 'proof-read',

        vuex: {
            getters: {
                proofReadCopy,
            },
            actions: {
                updateStoryFromProof,
                openProofRead,
            },
        },

        route: {
            data(transition) {
                this.openProofRead();

                transition.next();
            },
        },
    };
</script>