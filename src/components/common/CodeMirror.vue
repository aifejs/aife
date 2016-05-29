<template lang="pug">
    div.codeEditor
</template>

<style lang="stylus">
.codeEditor
    width: 100%
</style>

<script>
    import CodeMirror from 'codemirror';

    /**
     * Generic reusable code editor component, adapted from Twine source
     */
    export default {
        name: 'code-mirror',
        props: {
            options: Object,
            code: String,
        },

        watch: {
            code() {
                if (this.code !== this.codeMirror.getValue()) {
                    this.codeMirror.setValue(this.code);
                }
            },
        },

        compiled() {
            this.codeMirror = new CodeMirror(this.$el, this.options);
            this.codeMirror.setValue(this.code);

            this.codeMirror.on('change', this.onCodeMirrorChange.bind(this));

            // this is some hack, without it CodeMirror renders blank
            setTimeout(this.codeMirror.refresh.bind(this.codeMirror), 100);
        },

        attached() {
            this.codeMirror.focus();
        },

        methods: {
            onCodeMirrorChange() {
                this.code = this.codeMirror.getValue();

                // note kebab-case here, event names are not automatically converted
                this.$emit('code-changed', this.code);
            },
        },
    };
</script>