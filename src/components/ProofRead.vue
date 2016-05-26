<script type="module">
    import {proofReadCopy} from '../vuex/getters';
    import {updateStoryFromProof, openProofRead} from '../vuex/actions';

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
    }
</script>

<template lang="pug">
article.proofRead
    h1 {{proofReadCopy.title}}
    label
        span.text-danger
            | Editing story through proof-read copy is experimental feature, e.g. adding tags can be buggy.
        textarea.form-control("v-bind:value"="proofReadCopy.passages", @input="updateStoryFromProof")
</template>