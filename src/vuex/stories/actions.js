export function createStory({commit,}, title) {
    commit('CREATE_STORY', {title,});
}

export function deleteStory({commit,}, ifid) {
    commit('DELETE_STORY', ifid);
}

export function editStoryTitle({commit,}, {title, ifid,}) {
    commit('SET_STORY_TITLE', {
        title,
        ifid,
    });
}

export function duplicateStory({commit,}, ifid) {
    commit('DUPLICATE_STORY', ifid);
}

export function importStory({commit,}, story) {
    commit('IMPORT_STORY', story);
}


// Script actions

export function openScript({commit,}) {
    commit('OPEN_SCRIPT');
}

export function saveScript({commit,}, script) {
    commit('SAVE_SCRIPT', script);
}

export function closeScript({commit,}) {
    commit('CLOSE_SCRIPT');
}


// Stylesheet actions

export function openStylesheet({commit,}) {
    commit('OPEN_STYLESHEET');
}

export function saveStyleSheet({commit,}, styleSheet) {
    commit('SAVE_STYLESHEET', styleSheet);
}

export function closeStylesheet({commit,}) {
    commit('CLOSE_STYLESHEET');
}


// Html actions

export function openHtml({commit,}) {
    commit('OPEN_HTML');
}

export function saveHtml({commit,}, html) {
    commit('SAVE_HTML', html);
}

export function closeHtml({commit,}) {
    commit('CLOSE_HTML');
}


// Proof-read actions

export function openProofRead({commit,}) {
    commit('OPEN_PROOFREAD');
}

export function updateStoryFromProof({commit,}, value) {
    commit('UPDATE_STORY_FROM_PROOF', value);
}

export function closeProofRead({commit,}) {
    commit('CLOSE_PROOFREAD');
}
