/* eslint new-cap: [2, {newIsCap: true, capIsNew: false}] */

import {unpickleStory, caretPositionToPassage,} from '../lib/pickle';
import {getCurrentStory,} from './getters';
import uuid from 'tiny-uuid';
import {cloneDeep,} from 'lodash';
import createCopyTitle from '../lib/createCopyTitle';

function findByPid(passages, pid) {
    return passages.find((passage) => passage.pid === pid);
}

function findByPidIndex(passages, pid) {
    return passages.findIndex((passage) => passage.pid === pid);
}

function getCurrentPassages(state) {
    return getCurrentStory(state).passages;
}

function updateStory(story = null, state) {
    if (!story) {
        story = getCurrentStory(state);
    }

    story.lastEdit = Date.now();
}

export function CLOSE_PASSAGE(state, pid) {
    const index = state.opened.findIndex((passage) => passage.pid === pid);
    if (index > -1) {
        state.opened.splice(index, 1);
    }
}

export function UPDATE_PASSAGE(state, passage) {
    const story = getCurrentStory(state);
    const existingPassage = findByPid(story.passages, passage.pid); // TODO: make this more error-proof
    Object.assign(existingPassage, passage);
    updateStory(story);
}

export function ADD_PASSAGE(state, {title = 'New passage', text = 'This blank sheet stares at you. Blankly.',}) {
    const story = getCurrentStory(state);
    const lastPid = story.passages.reduce((pid, passage) => Math.max(pid, passage.pid), 0);

    story.passages.push({title, text, pid: lastPid + 1, tags: [],});
    updateStory(story);
}

export function OPEN_PASSAGE(state, pid) {
    const openedPassage = findByPid(state.opened, pid);
    const story = getCurrentStory(state);

    if (!openedPassage) {
        const passage = findByPid(story.passages, pid);
        if (passage) {
            state.opened.push(passage);
        }
    }
    updateStory(story);
}

export function DELETE_PASSAGE(state, pid) {
    CLOSE_PASSAGE(state, pid);

    const story = getCurrentStory(state);
    const index = findByPidIndex(story.passages, pid);
    if (index > -1) {
        story.passages.splice(index, 1);
    }
    updateStory(story);
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

export function STORIES_SORTING(state, sorting) {
    state.storiesSorting = sorting;
}

export function PASSAGES_FILTERING(state, filtering) {
    state.passagesFiltering = filtering;
}

export function SAVE_STYLESHEET(state, styleSheet) {
    const story = getCurrentStory(state);
    story.styleSheet = styleSheet;
    updateStory(story);
}

export function SAVE_SCRIPT(state, script) {
    const story = getCurrentStory(state);
    story.script = script;
    updateStory(story);
}

export function ADD_TAG(state, {pid, tag,}) {
    const story = getCurrentStory(state);
    const passage = findByPid(story.passages, pid);
    if (!passage.tags.includes(tag)) {
        passage.tags.push(tag);
    }
    updateStory(story);
}

export function REMOVE_TAG(state, {pid, index,}) {
    const story = getCurrentStory(state);
    const passage = findByPid(story.passages, pid);
    passage.tags.splice(index, 1);
    updateStory(story);
}

export function CREATE_STORY(state, {title,}) {
    state.stories.push({
        title,
        ifid: uuid(),
        passages: [],
        styleSheet: '',
        script: '',
        lastEdit: Date.now(),
    });
}

export function DELETE_STORY(state, ifid) {
    const storyIndex = state.stories.findIndex((story) => story.ifid === ifid);
    if (storyIndex !== -1) {
        state.stories.splice(storyIndex, 1);
    }
}

export function SET_STORY_TITLE(state, {title, ifid,}) {
    const storyToEdit = state.stories.find((story) => story.ifid === ifid);
    storyToEdit.title = title;
}

export function DUPLICATE_STORY(state, ifid) {
    const storyToDuplicate = state.stories.find((story) => story.ifid === ifid);
    const newStory = Object.assign(
        cloneDeep(storyToDuplicate),
        {
            ifid: uuid(),
            title: createCopyTitle(storyToDuplicate.title),
            lastEdit: Date.now(),
        }
    );

    state.stories.push(newStory);
}

export function OPEN_STYLESHEET(state) {
    state.editStylesheet = true;
}

export function CLOSE_STYLESHEET(state) {
    state.editStylesheet = false;
}

export function OPEN_SCRIPT(state) {
    state.editScript = true;
}

export function CLOSE_SCRIPT(state) {
    state.editScript = false;
}

export function OPEN_PROOFREAD(state) {
    state.proofRead = true;
}

export function CLOSE_PROOFREAD(state) {
    state.proofRead = false;
}