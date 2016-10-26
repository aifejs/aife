<template lang="pug">
article.codeEditor
    p.
        Editing story in proof-read mode is experimental feature, it's good idea to make duplicate of the story before.
        Red outline means Aife can't parse current copy (be careful with special characters).

    label.codeArea
        textarea.codeArea("v-bind:value"="proofReadCopy", @input="onInput", ":class"="{error: getProofModeError}")
</template>

<script>
    import {mapGetters, mapActions,} from 'vuex';
    import debounce from 'lodash/debounce';

    export default {
        name: 'proof-read',

        computed: mapGetters([
            'proofReadCopy',
            'getProofModeError',
        ]),

        methods: {
            onInput: debounce(
                function (event) {
                    this.$store.dispatch('updateStoryFromProof', event.target.value);
                },
                500
            ),

            onData(transition) {
                this.openProofRead();

                transition.next();
            },

            ...mapActions({
                openProofRead: 'openProofRead',
            }),
        },

        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.openProofRead();
            });
        },
    };
</script>