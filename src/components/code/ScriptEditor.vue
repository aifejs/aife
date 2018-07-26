<template lang="pug">
article.codeEditor
    label.codeArea
        strong Edit story script
        code-mirror(:options="jsEditorOptions", :code="getScript", @code-changed="saveScript")
</template>

<script>
import {mapGetters, mapActions,} from 'vuex';

import CodeMirror from './CodeMirror.vue';

export default {
    name: 'ScriptEditor',

    components: {
        CodeMirror,
    },

    computed: {
        ...mapGetters([
            'jsEditorOptions',
            'getScript',
        ]),
    },

    mounted() {
        import('codemirror-jshint-async').then(({register,}) => register());
    },

    methods: {
        ...mapActions([
            'saveScript',
            'openScript',
        ]),
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.openScript();
        });
    },
};
</script>