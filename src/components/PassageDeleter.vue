<template lang="pug">
    .alert.alert-danger(v-if="passage")
        | Are you sure you want to delete passage \#{{passage.pid}}?
        br
        .btn-group
            button.btn.btn-default(v-link="'/'") Cancel
            button.btn.btn-danger(v-link="'/'", "@click"="deletePassage(passage.pid)") Delete passage forever
</template>

<script type="module">
    import {deletePassage} from '../vuex/actions';
    import {getCurrentPassage} from '../vuex/getters';

    export default {
        name: 'passage-deleter',
        vuex: {
            actions: {
                deletePassage,
            },
            getters: {
                passage: getCurrentPassage,
            },
        },
    }
</script>