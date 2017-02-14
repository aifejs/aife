/* eslint new-cap: [2, {newIsCap: true, capIsNew: false}] */

import {updateStory, findByPid, findIndexByPid, getCurrentStory,} from '../utils';

const passageBlueprint = {
    title: 'New passage',
    text: 'This blank sheet stares at you. Blankly.',
    tags: [],
    starting: false,
    selected: false,
    position: {
        x: 0,
        y: 0,
    },
};

export function OPEN_PASSAGE(state, pid) {
    const story = getCurrentStory(state);
    const openedPassage = findByPid(story.opened, pid);

    if (!openedPassage) {
        const passage = findByPid(story.passages, pid);
        if (passage) {
            story.opened.push(passage);
        }
    }
    updateStory(story);
}

export function UPDATE_PASSAGE(state, passage) {
    const story = getCurrentStory(state);
    const existingPassage = findByPid(story.passages, passage.pid); // TODO: make this more error-proof
    Object.assign(existingPassage, passage);
    updateStory(story);
}

export function CLOSE_PASSAGE(state, pid) {
    const story = getCurrentStory(state);
    const index = story.opened.findIndex((passage) => passage.pid === pid);
    if (index > -1) {
        story.opened.splice(index, 1);
    }
}

/**
 * @param {IStory} story
 * @return {IPassage|null}
 */
function getLatestAddedPassage(story) {
    if (!story.passages.length) {
        return null;
    } else {
        return story.passages.reduce(
            (highestPidPassage, passage) => {
                if (passage.pid > highestPidPassage.pid) {
                    return passage;
                } else {
                    return highestPidPassage;
                }
            },
            story.passages[0]
        );
    }
}

export function ADD_PASSAGE(state, {title = passageBlueprint.title, text = passageBlueprint.text,}) {
    const story = getCurrentStory(state);
    const lastPassage = getLatestAddedPassage(story);

    story.passages.push({
        title,
        text,
        pid: lastPassage ? lastPassage.pid + 1 : 0,
        tags: [],
        starting: false,
        selected: false,
        position: { // TODO: refine position algorithm
            x: lastPassage ? lastPassage.position.x + 100 : 0,
            y: lastPassage ? lastPassage.position.y + 100 : 0,
        },
    });

    updateStory(story);
}

export function DELETE_PASSAGE(state, pid) {
    CLOSE_PASSAGE(state, pid);

    const story = getCurrentStory(state);
    const index = findIndexByPid(story.passages, pid);
    if (index > -1) {
        story.passages.splice(index, 1);
    }
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

export function MAKE_PASSAGE_STARTING(state, pid) {
    const story = getCurrentStory(state);
    const currentStarting = story.passages.find((passage) => passage.starting);
    if (currentStarting) {
        currentStarting.starting = false;
    }

    const passage = findByPid(story.passages, pid);
    passage.starting = true;

    updateStory(story);
}


// Passage de/selection

/**
 * @param {IState} state
 */
export function DESELECT_ALL_PASSAGES(state) {
    const story = getCurrentStory(state);

    story.passages.forEach((passage) => passage.selected = false);

    updateStory(story);
}

/**
 * @param {IState} state
 * @param {PassagePid} pid
 */
export function SELECT_PASSAGE(state, pid) {
    const story = getCurrentStory(state);
    story.passages.forEach((passage) => {
        // select passage if pid matches, deselect otherwise
        passage.selected = passage.pid === pid;
    });

    updateStory(story);
}

/**
 * @param {IState} state
 * @param {PassagePid[]} pids
 */
export function SELECT_PASSAGES(state, pids) {
    const story = getCurrentStory(state);
    story.passages.forEach((passage) => {
        // select passage if pid matches, deselect otherwise
        passage.selected = pids.includes(passage.pid);
    });

    updateStory(story);
}

/**
 * @param {IState} state
 * @param {PassagePid[]} pids
 */
export function SELECT_PASSAGES_ADD(state, pids) {
    const story = getCurrentStory(state);
    story.passages.forEach((passage) => {
        // select passage if pid matches
        if (pids.includes(passage.pid)) {
            passage.selected = true;
        }
    });

    updateStory(story);
}