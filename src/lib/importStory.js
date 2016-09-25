function readFile(file) {
    const reader = new FileReader();

    return new Promise((resolve) => {
        reader.addEventListener('load', (event) => resolve(event.target.result));

        reader.readAsText(file, 'UTF-8');
    });
}

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

// Converts a DOM <tw-storydata> element to a story object matching the format
// in the store.

function domToObject(storyEl, forceLastUpdate) {
    return {
        // Important: this is the passage's pid (a one-off id created at
        // publish time), *not* a database id.
        startPassagePid: storyEl.attributes.startnode.value,
        name: storyEl.attributes.name.value,
        ifid: storyEl.attributes.ifid.value,
        lastUpdate: forceLastUpdate || new Date(),
        script: extractCode(storyEl, 'script'),
        stylesheet: extractCode(storyEl, 'stylesheet'),
        zoom: 1,
        passages: Array.from(storyEl.querySelectorAll(selectors.passageData)).map(extractPassage),
    };
}

export function importStory(html, lastUpdate = new Date()) {
    const nodes = document.createElement('div');

    nodes.innerHTML = html;

    return Array.from(
        nodes.querySelectorAll(selectors.storyData)
    ).map((storyEl) => domToObject(storyEl, lastUpdate));
}

export function convertFromTwine(twineStoryObject) {
    const convertedStory = {
        title: twineStoryObject.name,
        ifid: twineStoryObject.ifid,
        passages: twineStoryObject.passages,
        opened: [],
        styleSheet: twineStoryObject.stylesheet,
        editStylesheet: false,
        script: twineStoryObject.script,
        editScript: false,
        editProof: false,
        lastEdit: twineStoryObject.lastUpdate,
    };

    const startingPid = parseInt(twineStoryObject.startPassagePid);
    const startingPassage = convertedStory.passages.find(({pid,}) => pid === startingPid);
    if (startingPassage) {
        startingPassage.starting = true;
    }

    return convertedStory;
}

export function importStories(htmls) {
    const stories = [];

    htmls.map(importStory).forEach(
        (imported) => {
            stories.push(
                ...imported.map(convertFromTwine)
            );
        }
    );

    return stories;
}