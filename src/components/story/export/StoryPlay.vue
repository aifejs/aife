<script>
import {playStory,} from './../../../lib/publishStory';
import {mapGetters,} from 'vuex';
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