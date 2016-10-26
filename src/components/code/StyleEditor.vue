<template lang="pug">
article.codeEditor
    label.codeArea
        strong Edit story styles
        code-mirror("v-bind:options"="cssEditorOptions", "v-bind:code"="getStyleSheet", "@code-changed"="saveStyleSheet")
</template>

<script>
    import CodeMirror from './CodeMirror.vue';
    import 'codemirror/mode/css/css';

    import {mapGetters, mapActions,} from 'vuex';

    export default {
        name: 'style-editor',

        computed: mapGetters([
            'cssEditorOptions',
            'getStyleSheet',
        ]),

        methods: {
            ...mapActions([
                'saveStyleSheet',
                'openStylesheet',
            ]),
        },

        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.openStylesheet();
            });
        },

        components: {
            CodeMirror,
        },
    };
</script>