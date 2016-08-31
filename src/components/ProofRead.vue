<template lang="pug">
article.codeEditor
    p.
        Editing story in proof-read mode is experimental feature, it's good idea to make duplicate of the story before.
        Red outline means Aife can't parse current copy (be careful with special characters).

    label.codeArea
        textarea.codeArea("v-bind:value"="proofReadCopy.passages", @input="updateStoryFromProof", ":class"="{error: getProofModeError}")
</template>

<style lang="stylus">

</style>

<script>
    import {proofReadCopy, getProofModeError,} from '../vuex/getters';
    import {updateStoryFromProof, openProofRead,} from '../vuex/actions';
    import debounce from 'lodash/debounce';

    export default {
        name: 'proof-read',

        vuex: {
            getters: {
                proofReadCopy,
                getProofModeError,
            },
            actions: {
                updateStoryFromProof: debounce(updateStoryFromProof, 500),
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