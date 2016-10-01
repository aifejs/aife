/* eslint new-cap: [2, {newIsCap: true, capIsNew: false}] */

import {
    OPEN_PASSAGE,
    UPDATE_PASSAGE,
    CLOSE_PASSAGE,
    ADD_PASSAGE,
    DELETE_PASSAGE,
    ADD_TAG,
    REMOVE_TAG,
    MAKE_PASSAGE_STARTING,
} from './passages/mutations';

import {
    CREATE_STORY,
    DELETE_STORY,
    SET_STORY_TITLE,
    DUPLICATE_STORY,
    IMPORT_STORY,
    LOAD_STORY,
    SET_STORIES_LOADED,
    OPEN_STYLESHEET,
    SAVE_STYLESHEET,
    CLOSE_STYLESHEET,
    OPEN_SCRIPT,
    SAVE_SCRIPT,
    CLOSE_SCRIPT,
    OPEN_PROOFREAD,
    UPDATE_STORY_FROM_PROOF,
    CLOSE_PROOFREAD,
} from './stories/mutations';

export function PASSAGES_SORTING(state, sorting) {
    state.passagesSorting = sorting;
}

export function STORIES_SORTING(state, sorting) {
    state.storiesSorting = sorting;
}

export function PASSAGES_FILTERING(state, filtering) {
    state.passagesFiltering = filtering;
}

export {
    OPEN_PASSAGE,
    UPDATE_PASSAGE,
    CLOSE_PASSAGE,
    ADD_PASSAGE,
    DELETE_PASSAGE,
    ADD_TAG,
    REMOVE_TAG,
    MAKE_PASSAGE_STARTING,

    CREATE_STORY,
    DELETE_STORY,
    SET_STORY_TITLE,
    DUPLICATE_STORY,
    IMPORT_STORY,
    LOAD_STORY,
    SET_STORIES_LOADED,
    OPEN_STYLESHEET,
    SAVE_STYLESHEET,
    CLOSE_STYLESHEET,
    OPEN_SCRIPT,
    SAVE_SCRIPT,
    CLOSE_SCRIPT,
    OPEN_PROOFREAD,
    UPDATE_STORY_FROM_PROOF,
    CLOSE_PROOFREAD,

    PASSAGES_SORTING,
    STORIES_SORTING,
    PASSAGES_FILTERING,
};