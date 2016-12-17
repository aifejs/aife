/**
 * @param {Blob} file
 * @return {Promise<string>}
 */
function readFile(file) {
    const reader = new FileReader();

    return new Promise((resolve) => {
        reader.addEventListener('load', (event) => resolve(event.target.result));

        reader.readAsText(file, 'UTF-8');
    });
}

/**
 * @param {FileList} files
 * @return {Promise<string[]>}
 */
export function readFiles(files) {
    const processed = [];

    for (let i = 0, len = files.length; i < len; i++) {
        processed.push(readFile(files[i]));
    }

    return Promise.all(processed);
}

const selectors = {
    passage: 'tw-passage',
    story: 'tw-story',
    script: '[role=script]',
    stylesheet: '[role=stylesheet]',
    storyData: 'tw-storydata',
    passageData: 'tw-passagedata',
};

/**
 * @param {Element} storyEl
 * @param {string} type
 * @return {string}
 */
function extractCode(storyEl, type) {
    return Array.from(storyEl.querySelectorAll(selectors[type]))
        .reduce(
            (src, el) => `${src}${el.textContent}\n`,
            ''
        );
}

function extractPassage({attributes, textContent,}) {
    const pos = attributes.position.value
        .split(',')
        .map(Math.floor);

    return {
        pid: attributes.pid.value, // Again, a one-off id, not a database id.
        left: pos[0],
        top: pos[1],
        width: attributes.width ? parseInt(attributes.width.value) : 100,
        height: attributes.height ? parseInt(attributes.height.value) : 100,
        tags: attributes.tags.value === '' ? [] : attributes.tags.value.split(/\s+/),
        name: attributes.name.value,
        text: textContent,
    };
}

/**
 * Converts a DOM <tw-storydata> element to a story object matching the internals Twine format.
 * @param {Element} storyEl
 * @param {boolean} forceLastUpdate
 * @return {ITwineStory}
 */
function domToObject(storyEl, forceLastUpdate) {
    const attribs = storyEl.attributes;

    return {
        // Important: this is the passage's pid (a one-off id created at
        // publish time), *not* a database id.
        startPassagePid: attribs.startnode.value,
        name: attribs.name.value,
        ifid: attribs.ifid.value,
        lastUpdate: forceLastUpdate || new Date(),
        script: extractCode(storyEl, 'script'),
        stylesheet: extractCode(storyEl, 'stylesheet'),
        zoom: 1,
        passages: Array.from(storyEl.querySelectorAll(selectors.passageData)).map(extractPassage),
        format: attribs.format.value,
    };
}

/**
 * @param {Element} html
 * @param {Date} [lastUpdate = new Date()]
 * @return {ITwineStory[]}
 */
export function importStory(html, lastUpdate = new Date()) {
    const nodes = document.createElement('div');

    nodes.innerHTML = html;

    return Array.from(
        nodes.querySelectorAll(selectors.storyData)
    ).map((storyEl) => domToObject(storyEl, lastUpdate));
}

/**
 * Smooth importing SC2 stories from twinery
 * @param {string} format
 * @return {string}
 */
function normalizeFormat(format) {
    if (format === 'SugarCube 2 (local/offline)') {
        return 'SugarCube 2';
    } else {
        return format;
    }
}

/**
 * @param {ITwineStory} twineStoryObject
 * @return {IStory}
 */
export function convertStory(twineStoryObject) {
    const convertedStory = {
        title: twineStoryObject.name,
        ifid: twineStoryObject.ifid,
        passages: twineStoryObject.passages.map(convertPassage),
        opened: [],
        styleSheet: twineStoryObject.stylesheet,
        editStylesheet: false,
        script: twineStoryObject.script,
        editScript: false,
        editProof: false,
        lastEdit: twineStoryObject.lastUpdate,
        format: normalizeFormat(twineStoryObject.format),
    };

    const startingPid = parseInt(twineStoryObject.startPassagePid);
    const startingPassage = convertedStory.passages.find(({pid,}) => pid === startingPid);
    if (startingPassage) {
        startingPassage.starting = true;
    }

    return convertedStory;
}

/**
 * @param {ITwinePassage} twinePassage
 * @return {IPassage}
 */
function convertPassage(twinePassage) {
    return {
        title: twinePassage.name,
        text: twinePassage.text,
        pid: Number(twinePassage.pid),
        tags: twinePassage.tags,
        starting: false,
    };
}

export function importStories(htmls) {
    const stories = [];

    htmls.map(importStory).forEach(
        (imported) => {
            stories.push(
                ...imported.map(convertStory)
            );
        }
    );

    return stories;
}