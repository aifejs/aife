/* eslint new-cap: [2, {newIsCap: true, capIsNew: false}] */

import cloneDeep from 'lodash/cloneDeep';
import uuid from 'tiny-uuid';
import {unpickleStory,} from '../../lib/pickle';
import createCopyTitle from '../../lib/createCopyTitle';
import updateStory from '../../lib/updateStory';
import {getCurrentStory,} from '../getters';

const storyBlueprint = {
    title: 'Untitled story',
    ifid: undefined,
    passages: [],
    opened: [],
    styleSheet: '',
    editStylesheet: false,
    script: '',
    editScript: false,
    editProof: false,
    customHtml: '',
    editCustomHtml: false,
    lastEdit: 0,
    format: 'SugarCube 2',
};


export function CREATE_STORY(state, {title,}) {
    const newStory = Object.assign(
        {},
        storyBlueprint,
        {
            title: createCopyTitle(title || storyBlueprint.title),
            ifid: uuid(),
            lastEdit: Date.now(),
        }
    );

    state.stories.push(newStory);
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

export function IMPORT_STORY(state, story) {
    // TODO: figure out sensible actions in case of ifid and title match
    state.stories.push(story);
}

export function LOAD_STORY(state, story) {
    state.stories.push(story);
}

export function SET_STORIES_LOADED(state, status) {
    state.storiesLoaded = status;
}


// Stylesheet mutations

export function OPEN_STYLESHEET(state) {
    const story = getCurrentStory(state);
    story.editStylesheet = true;
}

export function SAVE_STYLESHEET(state, styleSheet) {
    const story = getCurrentStory(state);
    story.styleSheet = styleSheet;
    updateStory(story);
}

export function CLOSE_STYLESHEET(state) {
    const story = getCurrentStory(state);
    story.editStylesheet = false;
    updateStory(story);
}


// Script mutations

export function OPEN_SCRIPT(state) {
    const story = getCurrentStory(state);
    story.editScript = true;
    updateStory(story);
}

export function SAVE_SCRIPT(state, script) {
    const story = getCurrentStory(state);
    story.script = script;
    updateStory(story);
}

export function CLOSE_SCRIPT(state) {
    const story = getCurrentStory(state);
    story.editScript = false;
    updateStory(story);
}

// Custom html mutations

export function OPEN_HTML(state) {
    const story = getCurrentStory(state);
    story.editCustomHtml = true;
    updateStory(story);
}

export function SAVE_HTML(state, htmlString) {
    const story = getCurrentStory(state);
    story.customHtml = htmlString;
    updateStory(story);
}

export function CLOSE_HTML(state) {
    const story = getCurrentStory(state);
    story.editCustomHtml = false;
    updateStory(story);
}


// Proof-read mutations

export function OPEN_PROOFREAD(state) {
    const story = getCurrentStory(state);
    story.proofRead = true;
    updateStory(story);
}

export function UPDATE_STORY_FROM_PROOF(state, proofCopy) {
    let unpickled;

    try {
        unpickled = unpickleStory(proofCopy);
    } catch (e) {
        state.proofModeError = true;
    }

    if (unpickled) {
        const story = getCurrentStory(state);

        Object.assign(story, unpickled);
        state.proofModeError = false;
        updateStory(story);
    }
}

export function CLOSE_PROOFREAD(state) {
    const story = getCurrentStory(state);
    story.proofRead = false;
}