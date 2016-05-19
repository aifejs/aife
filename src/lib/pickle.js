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
    const unpickled = [];
    const errors = [];

    storyString.split(passagesDelimiter).map((passage) => {
        try {
            unpickled.push(
                unpicklePassage(passage)
            );
        } catch (unpickleException) {
            errors.push(errors);
        }
    });

    if (errors.length) {
        unpickled.push({
            title: 'This passage contains passages that we were unable to parse',
            tags: [],
            pid: -1,
            text: errors.join(''),
        });
    }

    return unpickled;
}

export function caretPositionToPassage(pickled, caretPosition) {
    if (caretPosition === 0) {
        return 0;
    }

    const passages = pickled.split(passagesDelimiter);
    const delimiterLength = passagesDelimiter.length;
    let passageIndex = 0;
    let lengthOfPassagesBefore = 0;

    while (caretPosition > lengthOfPassagesBefore && lengthOfPassagesBefore <= pickled.length) {
        lengthOfPassagesBefore += passages[passageIndex].length + delimiterLength;
        passageIndex++;
    }

    return passageIndex - 1;
}