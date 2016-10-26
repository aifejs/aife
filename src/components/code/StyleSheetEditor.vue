<template lang="pug">
article.codeEditor
    label.codeArea
        strong Edit story script
        code-mirror("v-bind:options"="cssEditorOptions", "v-bind:code"="getStyleSheet", "@code-changed"="saveStyleSheet")
</template>

<script>
    import CodeMirror from './CodeMirror.vue';
    import 'codemirror/mode/css/css';

    import {mapGetters, mapActions,} from 'vuex';

    export default {
        computed: mapGetters([
            'cssEditorOptions',
            'getStyleSheet',
        ]),

        methods: {
            onData(transition) {
                this.openStylesheet();

                transition.next();
            },

            ...mapActions([
                'saveStyleSheet',
                'openStylesheet',
            ]),
        },

        watch: {
            $route: 'onData',
        },

        components: {
            CodeMirror,
        },
    };
</script>