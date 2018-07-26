<template lang="pug">
.tagList
    span.tagList-item(v-for="(tag, index) of tags", :class="{special: isSpecial(tag)}")
        | {{ tag }}
        fa-icon.activeIcon.danger.tagList-remove(icon="trash", @click="onTagRemoveClick(index)")

    input(:list="domId", placeholder="Press enter to add tag", @keyup="onKeyPress")
    datalist(:id="domId")
        option(v-for="(count, suggestion) of suggestions", :value="suggestion") {{count}}
</template>

<style lang="stylus">
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
        pid: {
            type: Number,
            required: true,
        },
        suggestions: {
            type: Object,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        },
        specialTags: {
            type: Array,
            required: true,
        },
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