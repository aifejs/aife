import storage from '../lib/asyncStorage';
import {
    openPassage,
    editPassage,
    editPassageText,
    closePassage,
    addPassage,
    deletePassage,
    addTag,
    removeTag,
    makeStarting,
} from './passages/actions';
import {
    createStory,
    deleteStory,
    editStoryTitle,
    duplicateStory,
    importStory,

    openScript,
    saveScript,
    closeScript,

    openStylesheet,
    saveStyleSheet,
    closeStylesheet,

    openHtml,
    saveHtml,
    closeHtml,

    openProofRead,
    updateStoryFromProof,
    closeProofRead,
} from './stories/actions';

function setPassagesSorting({commit,}, sorting) {
    commit('PASSAGES_SORTING', sorting);
}

function setStoriesSorting({commit,}, sorting) {
    commit('STORIES_SORTING', sorting);
}

function setPassagesFiltering({commit,}, event) {
    commit('PASSAGES_FILTERING', event.target.value);
}

function loadState({commit,}) {
    Promise.all([
        storage.getItem('stories', []),
    ]).then(
        ([stories,]) => {
            stories.forEach(
                (story) => {
                    commit('LOAD_STORY', story);
                }
            );

            commit('SET_STORIES_LOADED', true);
        }
    );
}

export {
    openPassage,
    editPassage,
    editPassageText,
    closePassage,
    addPassage,
    deletePassage,
    addTag,
    removeTag,
    makeStarting,

    createStory,
    deleteStory,
    editStoryTitle,
    duplicateStory,
    importStory,

    openScript,
    saveScript,
    closeScript,

    openStylesheet,
    saveStyleSheet,
    closeStylesheet,

    openHtml,
    saveHtml,
    closeHtml,

    openProofRead,
    updateStoryFromProof,
    closeProofRead,

    setPassagesSorting,
    setStoriesSorting,
    setPassagesFiltering,
    loadState,
};