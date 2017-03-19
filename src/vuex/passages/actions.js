export function openPassage({commit,}, pid) {
    commit('OPEN_PASSAGE', pid);
}

export function editPassage({commit,}, {value, pid, field,}) {
    commit('UPDATE_PASSAGE', {
        pid,
        [field]: value,
    });
}

export function editPassageText({commit,}, {pid, text,}) {
    commit('UPDATE_PASSAGE', {
        pid,
        text,
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

export function deselectAllPassages({commit,}) {
    commit('DESELECT_ALL_PASSAGES');
}

export function selectPassage({commit,}, pid) {
    commit('SELECT_PASSAGE', pid);
}

export function selectPassages({commit,}, pids) {
    commit('SELECT_PASSAGES', pids);
}

export function selectPassagesAdd({commit,}, pids) {
    commit('SELECT_PASSAGES_ADD', pids);
}

export function movePassage({commit,}, {pid, x, y,}) {
    commit('MOVE_PASSAGE', {
        pid,
        x,
        y,
    });
}

export function moveSelectedPassages({commit,}, {x, y,}) {
    commit('MOVE_SELECTED_PASSAGES', {
        x,
        y,
    });
}

export function selectPassagesByMarquee({commit,}, {start, end, mode = 'create',}) {
    commit('SELECT_PASSAGES_BY_MARQUEE', {
        start,
        end,
        mode,
    });
}

