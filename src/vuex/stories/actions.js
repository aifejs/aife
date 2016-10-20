export function createStory({dispatch,}, title) {
    dispatch('CREATE_STORY', {title,});
}

export function deleteStory({dispatch,}, ifid) {
    dispatch('DELETE_STORY', ifid);
}

export function editStoryTitle({dispatch,}, title, ifid) {
    dispatch('SET_STORY_TITLE', {
        title,
        ifid,
    });
}

export function duplicateStory({dispatch,}, ifid) {
    dispatch('DUPLICATE_STORY', ifid);
}

export function importStory({dispatch,}, story) {
    dispatch('IMPORT_STORY', story);
}


// Script actions

export function openScript({dispatch,}) {
    dispatch('OPEN_SCRIPT');
}

export function saveScript({dispatch,}, script) {
    dispatch('SAVE_SCRIPT', script);
}

export function closeScript({dispatch,}) {
    dispatch('CLOSE_SCRIPT');
}


// Stylesheet actions

export function openStylesheet({dispatch,}) {
    dispatch('OPEN_STYLESHEET');
}

export function saveStyleSheet({dispatch,}, styleSheet) {
    dispatch('SAVE_STYLESHEET', styleSheet);
}

export function closeStylesheet({dispatch,}) {
    dispatch('CLOSE_STYLESHEET');
}


// Html actions

export function openHtml({dispatch,}) {
    dispatch('OPEN_HTML');
}

export function saveHtml({dispatch,}, html) {
    dispatch('SAVE_HTML', html);
}

export function closeHtml({dispatch,}) {
    dispatch('CLOSE_HTML');
}


// Proof-read actions

export function openProofRead({dispatch,}) {
    dispatch('OPEN_PROOFREAD');
}

export function updateStoryFromProof({dispatch,}, event) {
    dispatch('UPDATE_STORY_FROM_PROOF', event.target.value);
}

export function closeProofRead({dispatch,}) {
    dispatch('CLOSE_PROOFREAD');
}
