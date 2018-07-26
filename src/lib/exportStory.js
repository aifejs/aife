import {stripIndent,} from 'common-tags';

import pkg from '../../package.json';

/**
 * @param {IStory} story
 * @return {number}
 */
function getStartingPid(story) {
    const startingPassage = story.passages.find(({starting,}) => starting);
    if (startingPassage) {
        return startingPassage.pid;
    } else {
        return 1;
    }
}

/**
 * @param {string[]} tags
 * @return {string}
 */
function exportTags(tags) {
    return tags.map((tag) => tag.replace(' ', '-')).join(' ');
}

/**
 * @param {IStory} story
 * @param {Array} formatOptions
 * @return {string}
 */
export default function exportStory(story, formatOptions) {
    return stripIndent`
<tw-storydata 
    name="${story.title}"
    startnode="${getStartingPid(story)}"
    creator="${pkg.name}"
    creator-version="${pkg.version}"
    ifid="${story.ifid}"
    format="${story.format}"
    ${formatOptions && formatOptions.includes('debug') ? 'options="debug"' : ''}
    hidden>
    <style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">${story.styleSheet}</style>
    <script role="script" id="twine-user-script" type="text/twine-javascript">${story.script}</script>
    ${story.passages.map(exportPassage)}
</tw-storydata>`;
}

/**
 * @param {IPassage} passage
 * @return {string}
 */
function exportPassage(passage) {
    return stripIndent`
        <tw-passagedata 
            pid="${passage.pid}" 
            name="${passage.title}" 
            tags="${exportTags(passage.tags)}"
            >${passage.text}</tw-passagedata>`;
}