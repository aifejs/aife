import storage from '../lib/asyncStorage';
import {
    openPassage,
    editPassage,
    closePassage,
    addPassage,
    deletePassage,
    addTag,
    removeTag,
} from './passages/actions';
import {
    addStory,
    deleteStory,
    editStoryTitle,
    duplicateStory,
    openStylesheet,
    saveStyleSheet,
    closeStylesheet,
    openScript, saveScript, closeScript,
    openProofRead,
    updateStoryFromProof,
    closeProofRead,
} from './stories/actions';

export function setPassagesSorting({dispatch,}, sorting) {
    dispatch('PASSAGES_SORTING', sorting);
}

export function setStoriesSorting({dispatch,}, sorting) {
    dispatch('STORIES_SORTING', sorting);
}

export function setPassagesFiltering({dispatch,}, event) {
    dispatch('PASSAGES_FILTERING', event.target.value);
}

export function loadState({dispatch,}) {
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
    closePassage,
    addPassage,
    deletePassage,
    addTag,
    removeTag,

    addStory,
    deleteStory,
    editStoryTitle,
    duplicateStory,
    openStylesheet,
    saveStyleSheet,
    closeStylesheet,
    openScript, saveScript, closeScript,
    openProofRead,
    updateStoryFromProof,
    closeProofRead,

    setPassagesSorting,
    setStoriesSorting,
    loadState,
};