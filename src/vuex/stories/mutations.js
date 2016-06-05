/* eslint new-cap: [2, {newIsCap: true, capIsNew: false}] */

import {cloneDeep,} from 'lodash';
import uuid from 'tiny-uuid';
import {unpickleStory, caretPositionToPassage,} from '../../lib/pickle';
import {UPDATE_PASSAGE,} from '../passages/mutations';
import createCopyTitle from '../../lib/createCopyTitle';
import updateStory from '../../lib/updateStory';
import {getCurrentStory,} from '../getters';

const storyBlueprint = {
    title: '',
    ifid: undefined,
    passages: [],
    opened: [],
    styleSheet: '',
    editStylesheet: false,
    script: '',
    editScript: false,
    editProof: false,
    lastEdit: 0,
};


export function CREATE_STORY(state, {title,}) {
    state.stories.push(
        Object.assign(
            {},
            storyBlueprint,
            {
                title,
                ifid: uuid(),
                lastEdit: Date.now(),
            }
        )
    );
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

export function LOAD_STORY(state, story) {
    state.stories.push(story);
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


// Proof-read mutations

export function OPEN_PROOFREAD(state) {
    const story = getCurrentStory(state);
    story.proofRead = true;
    updateStory(story);
}

export function UPDATE_STORY_FROM_PROOF(state, proofCopy, caretPosition) {
    // Update only changed passages to avoid redrawing every passage
    const passages = unpickleStory(proofCopy);
    const changedPassageIndex = caretPositionToPassage(proofCopy, caretPosition);
    const changedPassage = passages[changedPassageIndex];

    UPDATE_PASSAGE(state, changedPassage);
}

export function CLOSE_PROOFREAD(state) {
    const story = getCurrentStory(state);
    story.proofRead = false;
    updateStory(story);
}