export function openPassage({commit,}, pid) {
    commit('OPEN_PASSAGE', pid);
}

export function editPassage({commit,}, {value, pid, field,}) {
    commit('UPDATE_PASSAGE', {
        [field]: value,
        pid,
    });
}

export function editPassageText({commit,}, pid, text) {
    commit('UPDATE_PASSAGE', {
        text,
        pid,
    });
}

export function closePassage({commit,}, pid) {
    commit('CLOSE_PASSAGE', pid);
}

export function addPassage({commit,}) {
    commit('ADD_PASSAGE', {});
}

export function deletePassage({commit,}, pid) {
    commit('DELETE_PASSAGE', pid);
}

export function addTag({commit,}, {pid, tag,}) {
    commit('ADD_TAG', {
        pid,
        tag,
    });
}

export function removeTag({commit,}, {pid, index,}) {
    commit('REMOVE_TAG', {
        pid,
        index,
    });
}

export function makeStarting({commit,}, pid) {
    commit('MAKE_PASSAGE_STARTING', pid);
}