export function addPassage({dispatch,}) {
    dispatch('ADD_PASSAGE', {});
}

export function closePassage({dispatch,}, pid) {
    dispatch('CLOSE_PASSAGE', pid);
}

export function openPassage({dispatch,}, pid) {
    dispatch('OPEN_PASSAGE', pid);
}

export function deletePassage({dispatch,}, pid) {
    dispatch('DELETE_PASSAGE', pid);
}

export function updateStoryFromProof({dispatch,}, event) {
    dispatch('UPDATE_STORY_FROM_PROOF', event.target.value, event.target.selectionStart);
}

export function setPassagesSorting({dispatch,}, sorting) {
    dispatch('PASSAGES_SORTING', sorting);
}

export function setPassagesFiltering({dispatch,}, event) {
    dispatch('PASSAGES_FILTERING', event.target.value);
}

export function saveStyleSheet({dispatch,}, styleSheet) {
    dispatch('SAVE_STYLESHEET', styleSheet);
}

export function saveScript({dispatch,}, script) {
    dispatch('SAVE_SCRIPT', script);
}

export function editPassage({dispatch,}, {target,}, pid, field) {
    dispatch('UPDATE_PASSAGE', {
        [field]: target.value,
        pid,
    });
}