<template lang="pug">
article.codeEditor
    label.codeArea
        strong Edit story script
        code-mirror("v-bind:options"="jsEditorOptions", "v-bind:code"="getScript", "@code-changed"="saveScript")
</template>

<script>
    import CodeMirror from './common/CodeMirror.vue';
    import 'codemirror/mode/javascript/javascript';
    import 'codemirror/addon/lint/javascript-lint';
    import {jsEditorOptions, getScript,} from '../vuex/getters';
    import {saveScript, openScript,} from '../vuex/actions';

    export default {
        compiled() {
            require.ensure(['jshint',], (require) => {
                window.JSHINT = require('jshint').JSHINT; // javascript-lint expects JSHINT in global scope
            });
        },

        vuex: {
            getters: {
                jsEditorOptions,
                getScript,
            },

            actions: {
                saveScript,
                openScript,
            },
        },

        components: {
            CodeMirror,
        },

        route: {
            data(transition) {
                this.openScript();

                transition.next();
            },
        },
    };
</script>