<template lang="pug">
div
    //a(v-link="{name: storySettings}")
    //    i.fa.fa-cog
    //    | Story settings

    a("v-bind:href"="bugs.url", target="_blank")
        i.fa.fa-bug
        | Report a bug
</template>

<style lang="stylus"></style>

<script>
    import pkg from '../../../package.json';
    export default {
        data() {
            return {
                bugs: pkg.bugs,
            };
        },
    };
</script>