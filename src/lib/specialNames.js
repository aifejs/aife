export const specialNames = {
    'SugarCube': {
        passages: ['PassageReady', 'StoryAuthor', 'StoryBanner', 'StoryCaption', 'StoryInit', 'StoryMenu', 'StorySubtitle', 'PassageDone', 'MenuShare', 'MenuOptions',], // eslint-disable-line max-len
        tags: ['bookmark', 'nobr', 'widget',],
    },
    'SugarCube 2': {
        passages: ['PassageReady', 'StoryAuthor', 'StoryBanner', 'StoryCaption', 'StoryInit', 'StoryMenu', 'StorySubtitle', 'PassageDone', 'StoryShare', 'PassageFooter', 'PassageHeader',], // eslint-disable-line max-len
        tags: ['bookmark', 'nobr', 'widget',],
    },
    'Snowman': {
        passages: [],
        tags: [],
    },
    'Harlowe': {
        passages: [],
        tags: ['header', 'footer', 'startup', 'debug-header', 'debug-footer', 'debug-startup',],
    },
};

/**
 *
 * @param {IPassage} passage
 * @param {ISpecial} specials
 */
export function isSpecial(passage, specials) {
    if (specials.passages.includes(passage.title)) {
        return true;
    } else if (passage.tags.length) {
        for (const tag of passage.tags) {
            if (specials.tags.includes(tag)) {
                return true;
            }
        }
    }

    return false;
}