import {getCurrentStory,} from '../vuex/getters';

export default function updateStory(story = null, state) {
    if (!story) {
        story = getCurrentStory(state);
    }

    story.lastEdit = Date.now();
}