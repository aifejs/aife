/**
 * @param {IState} state
 * @return {IStory}
 */
export function getCurrentStory(state) {
    return state.stories.find(({ifid,}) => ifid === state.route.params.ifid);
}

/**
 * @param {IStory} story
 * @param {IState} [state]
 */
export function updateStory(story, state) {
    if (!story) {
        story = getCurrentStory(state);
    }

    story.lastEdit = Date.now();
}

/**
 * @param {IPassage[]} passages
 * @param {number} pid
 * @return {IPassage}
 */
export function findByPid(passages, pid) {
    return passages.find((passage) => passage.pid === pid);
}

/**
 * @param {IPassage[]} passages
 * @param {number} pid
 * @return {number}
 */
export function findIndexByPid(passages, pid) {
    return passages.findIndex((passage) => passage.pid === pid);
}

/**
 * @param {IPassage[]} passages
 * @param {number} pid
 * @return {boolean}
 */
export function hasPid(passages, pid) {
    return findByPid(passages, pid) !== undefined;
}