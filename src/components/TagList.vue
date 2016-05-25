<template lang="pug">
    .tagList
        span.tagList-item(v-for="tag of tags")
            | {{ tag }}
            button.btn.btn-danger.btn-xs("@click"="onTagRemoveClick($index)")
                span.glyphicon.glyphicon-remove
        input(list="{{uuid}}-{{pid}}", placeholder="Press enter to add tag", @keyup="onKeyPress")
        datalist(id="{{uuid}}-{{pid}}")
            option(v-for="(suggestion, count) of suggestions", value="{{ suggestion }}") {{count}}
</template>

<style lang="stylus"></style>

<script>
    import {uniqueId,} from 'lodash';
    export default {
        props: {
            pid: Number,
            suggestions: Object,
            tags: Array,
        },
        data() {
            return {
                uuid: uniqueId('tag-list-'),
            };
        },
        methods: {
            onKeyPress(event) {
                if (event.keyCode === 13) {
                    this.$emit('add-tag', this.pid, event.target.value);
                    event.target.value = '';
                }
            },
            onTagRemoveClick(index) {
                this.$emit('remove-tag', this.pid, index);
            },
        },
    };
</script>