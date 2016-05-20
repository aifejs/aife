/* eslint new-cap: [2, {newIsCap: true, capIsNew: false}] */

import {unpickleStory, caretPositionToPassage,} from '../lib/pickle';

function findByPid(passages, pid) {
    return passages.find((passage) => passage.pid === pid);
}

function findByPidIndex(passages, pid) {
    return passages.findIndex((passage) => passage.pid === pid);
}

function CLOSE_PASSAGE(state, pid) {
    const index = state.opened.findIndex((passage) => passage.pid === pid);
    if (index > -1) {
        state.opened.splice(index, 1);
    }
}

function UPDATE_PASSAGE(state, passage) {
    const existingPassage = findByPid(state.passages, passage.pid);
    Object.assign(existingPassage, passage);
}

const mutations = {
    ADD_PASSAGE(state, {title = 'New passage', text = 'This blank sheet stares at you. Blankly.',}) {
        const lastPid = state.passages.reduce((pid, passage) => Math.max(pid, passage.pid), 0);

        state.passages.push({title, text, pid: lastPid + 1,});
    },

    CLOSE_PASSAGE,

    OPEN_PASSAGE(state, pid) {
        const openedPassage = findByPid(state.opened, pid);

        if (!openedPassage) {
            const passage = findByPid(state.passages, pid);
            if (passage) {
                state.opened.push(passage);
            }
        }
    },

    DELETE_PASSAGE(state, pid) {
        CLOSE_PASSAGE(state, pid);

        const index = findByPidIndex(state.passages, pid);
        if (index > -1) {
            state.passages.splice(index, 1);
        }
    },

    UPDATE_PASSAGE,

    UPDATE_STORY_FROM_PROOF(state, proofCopy, caretPosition) {
        // Update only changed passages to avoid redrawing every passage
        const passages = unpickleStory(proofCopy);
        const changedPassageIndex = caretPositionToPassage(proofCopy, caretPosition);
        const changedPassage = passages[changedPassageIndex];

        UPDATE_PASSAGE(state, changedPassage);
    },

    PASSAGES_SORTING(state, sorting) {
        state.passagesSorting = sorting;
    },

    PASSAGES_FILTERING(state, filtering) {
        state.passagesFiltering = filtering;
    },
};

export default mutations;