import countWords from './countWords';

/**
 * @param {IPassage} passage
 * @return {number}
 */
function countPassageWords(passage) {
    return countWords(passage.text) + countWords(passage.title) + countWords(passage.tags);
}

/**
 * @param passage
 * @return {ITextStats}
 */
function passageStats(passage) {
    const allText = passage.text + passage.title + passage.tags.join('');
    const withoutSpaces = allText.replace(/\s/mg, '');
    return {
        words: countPassageWords(passage),
        characters: withoutSpaces.length,
        charactersAll: allText.length,
    };
}

/**
 * @param {IPassage[]} passages
 * @param {string} styleSheet
 * @param {string} script
 * @return {IStoryStats}
 */
export default function storyStats({passages, styleSheet, script,}) {
    const storyStatistics = passages.reduce(
        (accumulator, passage) => {
            const stat = passageStats(passage);
            accumulator.words += stat.words;
            accumulator.characters += stat.characters;
            accumulator.charactersAll += stat.charactersAll;
            return accumulator;
        },
        {
            words: 0,
            characters: 0,
            charactersAll: 0,
        }
    );

    Object.assign(
        storyStatistics,
        {
            passages: passages.length,
            code: styleSheet.length + script.length,
        }
    );

    return storyStatistics;
}