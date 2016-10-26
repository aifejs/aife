<template lang="pug">
.tagList
    span.tagList-item(v-for="(tag, index) of tags")
        | {{ tag }}
        i.fa.fa-trash.activeIcon.danger.tagList-remove("@click"="onTagRemoveClick(index)")

    input("v-bind:list"="domId", placeholder="Press enter to add tag", @keyup="onKeyPress")
    datalist("v-bind:id"="domId")
        option(v-for="(count, suggestion) of suggestions", "v-bind:value"="suggestion") {{count}}
</template>

<style lang="stylus" rel="stylesheet/stylus">
.tagList
    &-item
        margin-right: 1em
        &::before
            content: '#'
            color: silver
    &-remove
        margin-left: 1ex
</style>

<script>
    import uniqueId from 'lodash/uniqueId';
    export default {
        props: {
            pid: Number,
            suggestions: Object,
            tags: Array,
        },
        data() {
            return {
                uuid: uniqueId('tag-list-'),
                domId: `${uniqueId('tag-list-')}-${this.pid}`,
            };
        },
        methods: {
            onKeyPress({keyCode, target,}) {
                if (keyCode === 13) {
                    this.$emit('add-tag', {
                        pid: this.pid,
                        tag: target.value,
                    });
                    target.value = '';
                }
            },
            onTagRemoveClick(index) {
                this.$emit('remove-tag', {
                    pid: this.pid,
                    index,
                });
            },
        },
    };
</script>