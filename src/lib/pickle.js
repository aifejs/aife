import {stripIndents,} from 'common-tags';

const passagesDelimiter = '\n=========================================================\n';

export function pickleTags(tags) {
    return tags.map((tag) => `#${tag}`).join(' ');
}

const unpickleTagsRe = /(?:^| *)\#/;

export function unpickleTags(tagsString) {
    return tagsString.split(unpickleTagsRe).filter((tag) => tag);
}


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

export function picklePassage(passage) {
    return `${pickleTitleAndPid(passage)}\n${pickleTags(passage.tags)}\n${passage.text}`;
}

export function unpicklePassage(passage) {
    const [titleLine, tagLine, ...paragraphs] = passage.split('\n');

    const unpickled = unpickleTitleAndPid(titleLine);

    unpickled.tags = unpickleTags(tagLine);

    unpickled.text = paragraphs.join('\n');

    return unpickled;
}

export function pickleStory(story) {
    return stripIndents`
        = ${story.title} {${story.ifid}}
        
        ${picklePassages(story.passages)}`;
}

export function picklePassages(passages) {
    return passages.map(picklePassage).join(passagesDelimiter);
}

const storyTitleRe = /^= (.+?) {(.+?)}$/;

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

export function unpicklePassages(storyString) {
    const split = storyString.split(passagesDelimiter);
    return split.map((passage) => unpicklePassage(passage));
}