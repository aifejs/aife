import {pickleStory,} from '../lib/pickle';
import sortBy from 'lodash/sortBy';
import deburr from 'lodash/deburr';
import storyStats from '../lib/storyStats';

export function getCurrentStory({route, stories,}) {
    return stories.find(({ifid,}) => ifid === route.params.ifid);
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
    return passages.find((passage) => {
        if ('pid' in route.params) {
            return passage.pid.toString() === route.params.pid;
        } else {
            return passage.title === route.params.passageTitle;
        }
    });
}

export function stats({route, stories,}) {
    const story = getCurrentStory({route, stories,});
    return storyStats(story);
}

export function proofReadCopy({route, stories,}) {
    const story = getCurrentStory({route, stories,});
    return pickleStory(story);
}

export function getProofModeError({proofModeError,}) {
    return proofModeError;
}

export function cssEditorOptions({codeEditorOptions,}) {
    return Object.assign(
        {},
        codeEditorOptions,
        {
            mode: 'css',
        }
    );
}

export function jsEditorOptions({codeEditorOptions,}) {
    return Object.assign(
        {},
        codeEditorOptions,
        {
            mode: 'javascript',
        }
    );
}

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

export function getStyleSheet({route, stories,}) {
    return getCurrentStory({route, stories,}).styleSheet;
}

export function getScript({route, stories,}) {
    return getCurrentStory({route, stories,}).script;
}

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

export function getEditStylesheet({stories, route,}) {
    const currentStory = getCurrentStory({stories, route,});
    return currentStory.editStylesheet;
}

export function getEditScript({stories, route,}) {
    const currentStory = getCurrentStory({stories, route,});
    return currentStory.editScript;
}

export function getProofRead({stories, route,}) {
    const currentStory = getCurrentStory({stories, route,});
    return currentStory.proofRead;
}

export function getStoriesLoaded({storiesLoaded,}) {
    return storiesLoaded;
}

export function isStoryRunnable(story) {
    return story.passages && story.passages.length > 0;
}