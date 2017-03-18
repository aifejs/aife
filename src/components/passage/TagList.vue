<template lang="pug">
.tagList
    span.tagList-item(v-for="(tag, index) of tags", :class="{special: isSpecial(tag)}")
        | {{ tag }}
        i.fa.fa-trash.activeIcon.danger.tagList-remove(@click="onTagRemoveClick(index)")

    input(:list="domId", placeholder="Press enter to add tag", @keyup="onKeyPress")
    datalist(:id="domId")
        option(v-for="(count, suggestion) of suggestions", :value="suggestion") {{count}}
</template>

<style lang="stylus" rel="stylesheet/stylus">
.tagList
    &-item
        margin-right: 1em
        &::before
            content: '#'
            color: silver
        &.special
            font-weight: bold
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
            specialTags: Array,
        },
        data() {
            return {
                uuid: uniqueId('tag-list-'),
                domId: `${uniqueId('tag-list-')}-${this.pid}`,
            };
        },
        methods: {
            isSpecial(tag) {
                return this.specialTags.includes(tag);
            },
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