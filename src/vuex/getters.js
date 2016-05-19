import countWords from '../lib/countWords';
import {pickleStory,} from '../lib/pickle';

export function tabs(state) {
    return state.opened
        .map((passage) => ({
            title: passage.title,
            pid: passage.pid,
        }));
}

export function passagesOverview(state) {
    return state.passages;
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

export function countPassageWords(passage) {
    return countWords(passage.text) + countWords(passage.title) + countWords(passage.tags.join(' '));
}

export function passageStats(passage) {
    return {
        words: countPassageWords(passage),
        characters: passage.text.length + passage.title.length + passage.tags.join(' ').split(' ').length,
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