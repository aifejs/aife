import {stripIndents,} from 'common-tags';

const passagesDelimiter = '\n=========================================================\n';

/**
 * @param {string[]} tags
 * @return {string}
 */
export function pickleTags(tags) {
    return tags.map((tag) => `#${tag}`).join(' ');
}

const unpickleTagsRe = /(?:^| *)#/;

/**
 * @param {string} tagsString
 * @return {string[]}
 */
export function unpickleTags(tagsString) {
    return tagsString.split(unpickleTagsRe).filter((tag) => tag);
}

/**
 * @param {string} title
 * @param {number} pid
 * @param {boolean} starting
 * @return {string}
 */
export function pickleTitleAndPid({title, pid, starting,}) {
    return `== ${title} (${pid})${starting ? '*' : ''}`;
}

const unpickleTitleAndPidRe = /^== (.*) \((\d+)\)(\*?)$/;

export function unpickleTitleAndPid(titleLine) {
    const matches = unpickleTitleAndPidRe.exec(titleLine.trim());

    if (!matches) {
        throw new TypeError(`Wrong title and pid string: "${titleLine}"`);
    }

    const unpickled = {
        title: matches[1],
        pid: parseInt(matches[2]),
    };

    if (matches[3]) {
        unpickled.starting = true;
    }

    return unpickled;
}

/**
 * @param {IPassage} passage
 * @return {string}
 */
export function picklePassage(passage) {
    return `${pickleTitleAndPid(passage)}\n${pickleTags(passage.tags)}\n${passage.text}`;
}

/**
 * @param passageString
 * @return IPassage
 */
export function unpicklePassage(passageString) {
    const [titleLine, tagLine, ...paragraphs] = passageString.split('\n');

    const unpickled = unpickleTitleAndPid(titleLine);

    unpickled.tags = unpickleTags(tagLine);

    unpickled.text = paragraphs.join('\n');

    return unpickled;
}

/**
 * @param {IStory} story
 * @return {string}
 */
export function pickleStory(story) {
    return stripIndents`
        = ${story.title} {${story.ifid}}

        ${picklePassages(story.passages)}`;
}

/**
 * @param {IPassage[]} passages
 * @return {string}
 */
export function picklePassages(passages) {
    return passages.map(picklePassage).join(passagesDelimiter);
}

const storyTitleRe = /^= (.+?) {(.+?)}$/;

/**
 * @param storyString
 * @return {IStory}
 */
export function unpickleStory(storyString) {
    const story = {};
    let [firstLine, ...rest] = storyString.split('\n');
    firstLine = firstLine.trim();
    const matches = storyTitleRe.exec(firstLine);

    if (!matches) {
        throw new TypeError(`Wrong story title and IFID: "${firstLine}"`);
    } else {
        story.title = matches[1];
        story.ifid = matches[2];
    }

    story.passages = unpicklePassages(rest.join('\n').trim());

    return story;
}

/**
 * @param {string} storyString
 * @return {IPassage[]}
 */
export function unpicklePassages(storyString) {
    const split = storyString.split(passagesDelimiter);
    return split.map((passage) => unpicklePassage(passage));
}