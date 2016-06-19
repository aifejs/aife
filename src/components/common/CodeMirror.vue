<template lang="pug">
div.codeArea.mirror
</template>

<style lang="stylus"></style>

<script>
    import CodeMirror from 'codemirror';
    import debounce from 'lodash/debounce';

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

            this.onWindowResizeBound = this.onWindowResize.bind(this);
            this.onWindowResizeThrottled = debounce(this.onWindowResizeBound);

            // this is some hack, without it CodeMirror renders blank
            requestAnimationFrame(this.onWindowResizeBound);
        },

        attached() {
            this.codeMirror.focus();

            window.addEventListener('resize', this.onWindowResizeThrottled);
        },

        detached() {
            window.removeEventListener('resize', this.onWindowResizeThrottled);
        },

        methods: {
            onCodeMirrorChange() {
                this.code = this.codeMirror.getValue();

                // note kebab-case here, event names are not automatically converted
                this.$emit('code-changed', this.code);
            },

            onWindowResize() {
                const {width, height,} = this.$el.getBoundingClientRect();
                this.codeMirror.setSize(`${width}px`, `${height}px`);
                this.codeMirror.refresh();
            },
        },
    };
</script>