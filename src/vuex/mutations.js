/* eslint new-cap: [2, {newIsCap: true, capIsNew: false}] */

import {unpickleStory, caretPositionToPassage,} from '../lib/pickle';

function findByPid(passages, pid) {
    return passages.find((passage) => passage.pid === pid);
}

function findByPidIndex(passages, pid) {
    return passages.findIndex((passage) => passage.pid === pid);
}

export function CLOSE_PASSAGE(state, pid) {
    const index = state.opened.findIndex((passage) => passage.pid === pid);
    if (index > -1) {
        state.opened.splice(index, 1);
    }
}

export function UPDATE_PASSAGE(state, passage) {
    const existingPassage = findByPid(state.passages, passage.pid); // TODO: make this more error-proof
    Object.assign(existingPassage, passage);
}

export function ADD_PASSAGE(state, {title = 'New passage', text = 'This blank sheet stares at you. Blankly.',}) {
    const lastPid = state.passages.reduce((pid, passage) => Math.max(pid, passage.pid), 0);

    state.passages.push({title, text, pid: lastPid + 1,});
}

export function OPEN_PASSAGE(state, pid) {
    const openedPassage = findByPid(state.opened, pid);

    if (!openedPassage) {
        const passage = findByPid(state.passages, pid);
        if (passage) {
            state.opened.push(passage);
        }
    }
}

export function DELETE_PASSAGE(state, pid) {
    CLOSE_PASSAGE(state, pid);

    const index = findByPidIndex(state.passages, pid);
    if (index > -1) {
        state.passages.splice(index, 1);
    }
}

export function UPDATE_STORY_FROM_PROOF(state, proofCopy, caretPosition) {
    // Update only changed passages to avoid redrawing every passage
    const passages = unpickleStory(proofCopy);
    const changedPassageIndex = caretPositionToPassage(proofCopy, caretPosition);
    const changedPassage = passages[changedPassageIndex];

    UPDATE_PASSAGE(state, changedPassage);
}

export function PASSAGES_SORTING(state, sorting) {
    state.passagesSorting = sorting;
}

export function PASSAGES_FILTERING(state, filtering) {
    state.passagesFiltering = filtering;
}

export function SAVE_STYLESHEET(state, styleSheet) {
    state.styleSheet = styleSheet;
}

export function SAVE_SCRIPT(state, script) {
    state.script = script;
}

export function ADD_TAG(state, {pid, tag,}) {
    const passage = findByPid(state.passages, pid);
    if (!passage.tags.includes(tag)) {
        passage.tags.push(tag);
    }
}

export function REMOVE_TAG(state, {pid, index,}) {
    const passage = findByPid(state.passages, pid);
    passage.tags.splice(index, 1);
}