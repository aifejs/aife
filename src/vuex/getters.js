import {pickleStory,} from '../lib/pickle';
import sortBy from 'lodash/sortBy';
import deburr from 'lodash/deburr';
import storyStats from '../lib/storyStats';
import {getCurrentStory,} from './utils';

/**
 * @param {IState} state
 * @return {IStory}
 */
export function story(state) {
    return getCurrentStory(state);
}

export function tabs(state) {
    const story = getCurrentStory(state);
    return story.opened
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
    const passages = getCurrentStory({route, stories,}).passages;
    let passagesToSort;
    const termTrimmed = passagesFiltering.trim();
    if (termTrimmed === '') {
        passagesToSort = passages;
    } else {
        const deburred = deburr(termTrimmed).toLowerCase();
        passagesToSort = passages.filter(passageCheckerFactory(deburred));
    }

    const sorted = sortBy(passagesToSort, (passage) => passage[passagesSorting.field]);

    if (passagesSorting.sort === 'desc') {
        return sorted.reverse();
    } else {
        return sorted;
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
    const story = getCurrentStory({route, stories,});
    return storyStats(story);
}

/**
 * @param {IRoute} route
 * @param {IStory[]} stories
 * @return string
 */
export function proofReadCopy({route, stories,}) {
    const story = getCurrentStory({route, stories,});
    return pickleStory(story);
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
    passages(story) {
        return story.passages.length;
    },
    title(story) {
        return story.title;
    },
    lastEdit(story) {
        return story.lastEdit;
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

    return sorted.map((story) => ({
        title: story.title,
        stats: storyStats(story),
        ifid: story.ifid,
        passages: story.passages,
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
 * @param {IStoryItem} story
 * @return {boolean}
 */
export function isStoryRunnable(story) {
    return story.passages && story.passages.length > 0;
}