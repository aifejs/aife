const passagesDelimiter = '\n=========================================================\n';

export function pickleTags(tags) {
    return tags.map((tag) => `#${tag}`).join(' ');
}

const unpickleTagsRe = /(?:^| *)\#/;

export function unpickleTags(tagsString) {
    return tagsString.split(unpickleTagsRe).filter((tag) => tag);
}


export function pickleTitleAndPid({title, pid,}) {
    return `== ${title} (${pid})`;
}

const unpickleTitleAndPidRe = /^== (.*) \((\d+)\)$/;

export function unpickleTitleAndPid(titleLine) {
    const matches = unpickleTitleAndPidRe.exec(titleLine.trim());

    if (!matches) {
        throw new TypeError(`Wrong title and pid string: "${titleLine}"`);
    }

    return {
        title: matches[1],
        pid: parseInt(matches[2]),
    };
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

export function pickleStory(passages) {
    return passages.map(picklePassage).join(passagesDelimiter);
}

export function unpickleStory(storyString) {
    const split = storyString.split(passagesDelimiter);
    return split.map((passage) => unpicklePassage(passage));
}