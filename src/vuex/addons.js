import asyncStorage from '../lib/asyncStorage';

const mutationMap = {
    'CLOSE_PASSAGE': 'stories',
    'OPEN_PASSAGE': 'stories',
    'DELETE_PASSAGE': 'stories',
    'ADD_PASSAGE': 'stories',
    'SYNC_OPENED_PASSAGES': 'stories',

    'SET_STORY_TITLE': 'stories',
    'CREATE_STORY': 'stories',
    'DELETE_STORY': 'stories',
    'DUPLICATE_STORY': 'stories',
    'IMPORT_STORY': 'stories',

    'OPEN_SCRIPT': 'stories',
    'SAVE_SCRIPT': 'stories',
    'CLOSE_SCRIPT': 'stories',

    'OPEN_STYLESHEET': 'stories',
    'SAVE_STYLESHEET': 'stories',
    'CLOSE_STYLESHEET': 'stories',

    'OPEN_HTML': 'stories',
    'SAVE_HTML': 'stories',
    'CLOSE_HTML': 'stories',

    'OPEN_PROOFREAD': 'stories',
    'UPDATE_STORY_FROM_PROOF': 'stories',
    'CLOSE_PROOFREAD': 'stories',

    'ADD_TAG': 'stories',
    'REMOVE_TAG': 'stories',
};

export const persistenceMw = {
    onMutation({type,}, state) {
        const key = mutationMap[type];
        asyncStorage.setItem(key, state[key]);
    },
};

export function persistencePlugin(store) {
    store.subscribe((mutation, state) => {
        const key = mutationMap[mutation.type];
        asyncStorage.setItem(key, state[key]);
    });
}