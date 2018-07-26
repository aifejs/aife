<script>
import {mapGetters,} from 'vuex';

import {playStory,} from './../../../lib/publishStory';

export default {
    name: 'StoryDebug',

    computed: {
        ...mapGetters(['story',]),
    },

    mounted() {
        playStory(this.story, {formatOptions: ['debug',],});
    },
};
</script>