<script>
import {playStory,} from './../../../lib/publishStory';
import {mapGetters,} from 'vuex';
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