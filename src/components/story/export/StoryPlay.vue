<script>
import {mapGetters,} from 'vuex';

import {playStory,} from './../../../lib/publishStory';

export default {
    name: 'StoryPlay',

    computed: {
        ...mapGetters(['story',]),
    },

    mounted() {
        playStory(this.story, {});
    },
};
</script>