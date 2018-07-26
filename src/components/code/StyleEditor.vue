<template lang="pug">
article.codeEditor
    label.codeArea
        strong Edit story styles
        code-mirror(:options="cssEditorOptions", :code="getStyleSheet", @code-changed="saveStyleSheet")
</template>

<script>
import {mapGetters, mapActions,} from 'vuex';

import CodeMirror from './CodeMirror.vue';

export default {
    name: 'StyleEditor',

    components: {
        CodeMirror,
    },

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
};
</script>