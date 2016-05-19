<script type="module">
    import {proofReadCopy} from '../vuex/getters';
    import {updateStoryFromProof} from '../vuex/actions';

    export default {
        name: 'proof-read',
        vuex: {
            getters: {
                proofReadCopy,
            },
            actions: {
                updateStoryFromProof,
            },
        },
    }
</script>

<template lang="pug">
article.proofRead
    a(v-link="{name: 'overview'}") Back to overview
    h1 {{proofReadCopy.title}}
    label
        span.text-danger
            | Editing story through proof-read copy is experimental feature, e.g. adding tags can be buggy.
        textarea.form-control("v-bind:value"="proofReadCopy.passages", @input="updateStoryFromProof")
</template>