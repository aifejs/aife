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
    openStylesheet,
    saveStyleSheet,
    closeStylesheet,
    openHtml,
    saveHtml,
    closeHtml,
    openScript,
    saveScript,
    closeScript,
    openProofRead,
    updateStoryFromProof,
    closeProofRead,
} from './stories/actions';

function setPassagesSorting({dispatch,}, sorting) {
    dispatch('PASSAGES_SORTING', sorting);
}

function setStoriesSorting({dispatch,}, sorting) {
    dispatch('STORIES_SORTING', sorting);
}

function setPassagesFiltering({dispatch,}, event) {
    dispatch('PASSAGES_FILTERING', event.target.value);
}

function loadState({dispatch,}) {
    Promise.all([
        storage.getItem('stories', []),
    ]).then(
        ([stories,]) => {
            stories.forEach(
                (story) => {
                    dispatch('LOAD_STORY', story);
                }
            );

            dispatch('SET_STORIES_LOADED', true);
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

    openStylesheet,
    saveStyleSheet,
    closeStylesheet,

    openHtml,
    saveHtml,
    closeHtml,

    openScript,
    saveScript,
    closeScript,

    openProofRead,
    updateStoryFromProof,
    closeProofRead,

    setPassagesSorting,
    setStoriesSorting,
    setPassagesFiltering,
    loadState,
};