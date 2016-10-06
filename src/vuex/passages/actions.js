export function openPassage({dispatch,}, pid) {
    dispatch('OPEN_PASSAGE', pid);
}

export function editPassage({dispatch,}, {target,}, pid, field) {
    dispatch('UPDATE_PASSAGE', {
        [field]: target.value,
        pid,
    });
}

export function editPassageText({dispatch,}, pid, text) {
    dispatch('UPDATE_PASSAGE', {
        text,
        pid,
    });
}

export function closePassage({dispatch,}, pid) {
    dispatch('CLOSE_PASSAGE', pid);
}

export function addPassage({dispatch,}) {
    dispatch('ADD_PASSAGE', {});
}

export function deletePassage({dispatch,}, pid) {
    dispatch('DELETE_PASSAGE', pid);
}

export function addTag({dispatch,}, pid, tag) {
    dispatch('ADD_TAG', {
        pid,
        tag,
    });
}

export function removeTag({dispatch,}, pid, index) {
    dispatch('REMOVE_TAG', {
        pid,
        index,
    });
}

export function makeStarting({dispatch,}, pid) {
    dispatch('MAKE_PASSAGE_STARTING', pid);
}