import countWords from '../lib/countWords';
import {pickleStory,} from '../lib/pickle';
import {sortBy,deburr,uniq,} from 'lodash';

export function tabs(state) {
    return state.opened
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

export function passagesOverview({passages, passagesSorting, passagesFiltering,}) {
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

export function getCurrentPassage({passages, route,}) {
    return passages.find((passage) => {
        if ('pid' in route.params) {
            return passage.pid.toString() === route.params.pid;
        } else {
            return passage.title === route.params.passageTitle;
        }
    });
}

function countPassageWords(passage) {
    return countWords(passage.text) + countWords(passage.title) + countWords(passage.tags);
}

function passageStats(passage) {
    return {
        words: countPassageWords(passage),
        characters: passage.text.length + passage.title.length + passage.tags.join('').length,
    };
}

export function stats({passages,}) {
    const storyStats = passages.reduce(
        (accumulator, passage) => {
            const stat = passageStats(passage);
            accumulator.words += stat.words;
            accumulator.characters += stat.characters;
            return accumulator;
        },
        {
            words: 0,
            characters: 0,
        }
    );

    storyStats.passages = passages.length;

    return storyStats;
}

export function proofReadCopy({passages, title,}) {
    return {
        title,
        passages: pickleStory(passages),
    };
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

export function getStyleSheet({styleSheet,}) {
    return styleSheet;
}

export function getScript({script,}) {
    return script;
}

export function tagSuggestions({passages, route,}) {
    const collectedTags = [];
    let currentPassageTags = [];
    passages.forEach(({tags, pid,}) => {
        if (pid.toString() !== route.params.pid) {
            collectedTags.push(...tags);
        } else {
            currentPassageTags = tags;
        }
    });

    collectedTags.push(...currentPassageTags);

    return uniq(collectedTags);
}

export function tagSuggestionsCounted({passages,}) {
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