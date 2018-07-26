import sortBy from 'lodash/sortBy';
import deburr from 'lodash/deburr';

import {getCurrentStory,} from './utils';

import storyStats from '../lib/storyStats';
import {pickleStory,} from '../lib/pickle';
import {specialNames, isSpecial,} from '../lib/specialNames';

/**
 * @param {IState} state
 * @return {IStory}
 */
export function story(state) {
    return getCurrentStory(state);
}

export function tabs(state) {
    const currentStory = getCurrentStory(state);
    return currentStory.opened
        .map((passage) => ({
            title: passage.title,
            pid: passage.pid,
        }));
}

function passageCheckerFactory(term) {
    return function ({text, title,}) {
        return deburr(text.toLowerCase()).includes(term) || deburr(title.toLowerCase()).includes(term);
    };
}

export function passagesOverview({route, stories, passagesSorting, passagesFiltering,}) {
    const currentStory = getCurrentStory({route, stories,});
    const passages = currentStory.passages;
    const specials = specialNames[currentStory.format];

    let passagesToSort;
    const termTrimmed = passagesFiltering.trim();
    if (termTrimmed === '') {
        passagesToSort = passages;
    } else {
        const deburred = deburr(termTrimmed).toLowerCase();
        passagesToSort = passages.filter(passageCheckerFactory(deburred));
    }

    const sorted = sortBy(passagesToSort, (passage) => passage[passagesSorting.field]);

    const marked = sorted.map((/** IPassage */passage) => ({
        special: isSpecial(passage, specials),
        title: passage.title,
        text: passage.text,
        starting: passage.starting,
        pid: passage.pid,
    }));

    if (passagesSorting.sort === 'desc') {
        return marked.reverse();
    } else {
        return marked;
    }
}
export function getPassagesFiltering({passagesFiltering,}) {
    return passagesFiltering;
}

export function getCurrentPassage({route, stories,}) {
    const passages = getCurrentStory({route, stories,}).passages;
    let currentPassage;

    if ('pid' in route.params) {
        const pid = parseInt(route.params.pid); // sometimes it comes as string, sometimes as number
        currentPassage = passages.find((passage) => passage.pid === pid);
    } else {
        currentPassage = passages.find((passage) => passage.title === route.params.passageTitle);
    }

    return currentPassage;
}

/**
 * @param {IRoute} route
 * @param {IStory[]} stories
 * @return {IStoryStats}
 */
export function stats({route, stories,}) {
    const currentStory = getCurrentStory({route, stories,});
    return storyStats(currentStory);
}

/**
 * @param {IRoute} route
 * @param {IStory[]} stories
 * @return string
 */
export function proofReadCopy({route, stories,}) {
    const currentStory = getCurrentStory({route, stories,});
    return pickleStory(currentStory);
}

export function getProofModeError({proofModeError,}) {
    return proofModeError;
}

/**
 * @param {IEditorOptions} codeEditorOptions
 * @return {IEditorOptions}
 */
export function jsEditorOptions({codeEditorOptions,}) {
    return Object.assign(
        {},
        codeEditorOptions,
        {
            mode: 'javascript',
        }
    );
}

/**
 * @param {IEditorOptions} codeEditorOptions
 * @return {IEditorOptions}
 */
export function cssEditorOptions({codeEditorOptions,}) {
    return Object.assign(
        {},
        codeEditorOptions,
        {
            mode: 'css',
        }
    );
}

/**
 * @param {IEditorOptions} codeEditorOptions
 * @return {IEditorOptions}
 */
export function htmlEditorOptions({codeEditorOptions,}) {
    return Object.assign(
        {},
        codeEditorOptions,
        {
            mode: 'htmlmixed',
        }
    );
}

/**
 * @param {IEditorOptions} codeEditorOptions
 * @param {IRoute} route
 * @param {IStory[]} stories
 * @return {IEditorOptions}
 */
export function passageEditorOptions({codeEditorOptions, route, stories,}) {
    const currentStory = getCurrentStory({route, stories,});
    const options = {};

    if (currentStory.format.startsWith === 'SugarCube') { // can be SugarCube 1 too
        options.mode = 'sugarcube';
    }

    return Object.assign(
        {},
        codeEditorOptions,
        options
    );
}

/**
 * @param {IRoute} route
 * @param {IStory[]} stories
 * @return {string}
 */
export function getScript({route, stories,}) {
    return getCurrentStory({route, stories,}).script;
}

/**
 * @param {IRoute} route
 * @param {IStory[]} stories
 * @return {string}
 */
export function getStyleSheet({route, stories,}) {
    return getCurrentStory({route, stories,}).styleSheet;
}

/**
 * @param {IRoute} route
 * @param {IStory[]} stories
 * @return {string}
 */
export function getHtml({route, stories,}) {
    return getCurrentStory({route, stories,}).customHtml;
}

/**
 * @param {IRoute} route
 * @param {IStory[]} stories
 * @return {Dictionary<number>}
 */
export function tagSuggestionsCounted({route, stories,}) {
    const passages = getCurrentStory({route, stories,}).passages;
    const collectedTags = {};

    passages.forEach(({tags,}) => {
        tags.forEach((tag) => {
            if (!collectedTags[tag]) {
                collectedTags[tag] = 1;
            } else {
                collectedTags[tag] += 1;
            }
        });
    });

    return collectedTags;
}

const storySorters = {
    passages(storyToSort) {
        return storyToSort.passages.length;
    },
    title(storyToSort) {
        return storyToSort.title;
    },
    lastEdit(storyToSort) {
        return storyToSort.lastEdit;
    },
};

/**
 * @param {IStory} stories
 * @param {ISorting} storiesSorting
 * @return {IStoryItem[]}
 */
export function storiesList({stories, storiesSorting,}) {
    if (!stories) {
        return [];
    }

    let sorted = sortBy(stories, storySorters[storiesSorting.field]);

    if (storiesSorting.sort === 'desc') {
        sorted = sorted.reverse();
    }

    return sorted.map((sortedStory) => ({
        title: sortedStory.title,
        stats: storyStats(sortedStory),
        ifid: sortedStory.ifid,
        passages: sortedStory.passages,
    }));
}

export function getCurrentIfid({route,}) {
    return route.params.ifid;
}

export function getEditScript({stories, route,}) {
    const currentStory = getCurrentStory({stories, route,});
    return currentStory.editScript;
}

export function getEditStylesheet({stories, route,}) {
    const currentStory = getCurrentStory({stories, route,});
    return currentStory.editStylesheet;
}

export function getEditHtml({stories, route,}) {
    const currentStory = getCurrentStory({stories, route,});
    return currentStory.editCustomHtml;
}

export function getProofRead({stories, route,}) {
    const currentStory = getCurrentStory({stories, route,});
    return currentStory.proofRead;
}

export function getStoriesLoaded({storiesLoaded,}) {
    return storiesLoaded;
}

/**
 * @param {IStoryItem} runnableStory
 * @return {boolean}
 */
export function isStoryRunnable(runnableStory) {
    return runnableStory.passages && runnableStory.passages.length > 0;
}

export function hasSelectedPassages({stories, route,}) {
    const currentStory = getCurrentStory({stories, route,});

    for (let i = 0, len = currentStory.passages.length; i < len; i++) {
        if (currentStory.passages[i].selected) {
            return true;
        }
    }

    return false;
}