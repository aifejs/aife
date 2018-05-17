<template lang="pug">
div.codeArea.mirror
</template>

<script>
import debounce from 'lodash/debounce';

/**
 * Generic reusable code editor component, adapted from Twine source
 */
export default {
    name: 'CodeMirror',
    props: {
        options: {
            type: Object,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
    },

    mounted() {
        import('../../lib/codeMirrorIntegration').then((integration) => {
            const CodeMirror = integration.default;
            this.codeMirror = new CodeMirror(this.$el, this.options);
            this.codeMirror.setValue(this.code);

            this.codeMirror.on('change', this.onCodeMirrorChange.bind(this));

            this.onWindowResizeBound = this.onWindowResize.bind(this);
            this.onWindowResizeThrottled = debounce(this.onWindowResizeBound);

            // this is some hack, without it CodeMirror renders blank
            requestAnimationFrame(this.onWindowResizeBound);

            this.$nextTick(() => {
                this.onAttached();
            });
        });
    },

    destroyed() {
        this.$nextTick(() => {
            this.onDetached();
        });
    },

    methods: {
        onCodeMirrorChange() {
            // note kebab-case here, event names are not automatically converted
            this.$emit('code-changed', this.codeMirror.getValue());
        },

        onWindowResize() {
            const {width, height,} = this.$el.getBoundingClientRect();
            this.codeMirror.setSize(`${width}px`, `${height}px`);
            this.codeMirror.refresh();
        },

        onAttached() {
            this.codeMirror.focus();

            window.addEventListener('resize', this.onWindowResizeThrottled);
        },

        onDetached() {
            window.removeEventListener('resize', this.onWindowResizeThrottled);
        },
    },
};
</script>

<style lang="stylus"></style>