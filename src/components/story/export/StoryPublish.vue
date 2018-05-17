<script>
import {publishStory,} from './../../../lib/publishStory';
import {mapGetters,} from 'vuex';
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