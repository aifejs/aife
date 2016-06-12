import asyncStorage from '../lib/asyncStorage';

const mutationMap = {
    'CLOSE_PASSAGE': 'stories',
    'OPEN_PASSAGE': 'stories',

    'DELETE_PASSAGE': 'stories',
    'ADD_PASSAGE': 'stories',
    'SET_STORY_TITLE': 'stories',
    'DUPLICATE_STORY': 'stories',
    'CREATE_STORY': 'stories',
    'DELETE_STORY': 'stories',
    'UPDATE_STORY_FROM_PROOF': 'stories',
    'SAVE_STYLESHEET': 'stories',
    'SAVE_SCRIPT': 'stories',
    'ADD_TAG': 'stories',
    'REMOVE_TAG': 'stories',
};

export const persistenceMw = {
    onMutation({type,}, state, store) {
        const key = mutationMap[type];
        asyncStorage.setItem(key, state[key]);
    },
};