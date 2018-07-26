<script>
import {mapGetters,} from 'vuex';

import {publishStory,} from './../../../lib/publishStory';

export default {
    name: 'StoryDebug',

    computed: {
        ...mapGetters(['story',]),
    },

    mounted() {
        publishStory(this.story, {}, `${this.story.title}.html`);
    },
};
</script>