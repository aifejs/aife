<template lang="pug">
article.codeEditor
    label.codeArea
        strong Edit story script
        code-mirror("v-bind:options"="jsEditorOptions", "v-bind:code"="getScript", "@code-changed"="saveScript")
</template>

<script>
    import CodeMirror from './CodeMirror.vue';
    import 'codemirror/mode/javascript/javascript';
    import 'codemirror/addon/lint/javascript-lint';
    import {mapGetters, mapActions,} from 'vuex';

    export default {
        mounted() {
            require.ensure([], function (require) { // eslint-disable-line prefer-arrow-callback
                window.JSHINT = require('jshint').JSHINT; // javascript-lint expects JSHINT in global scope
            });
        },

        computed: mapGetters([
            'jsEditorOptions',
            'getScript',
        ]),

        methods: {
            onData(transition) {
                this.openScript();

                transition.next();
            },

            ...mapActions([
                'saveScript',
                'openScript',
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