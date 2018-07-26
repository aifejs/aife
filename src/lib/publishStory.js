import saveAs from 'browser-saveas';

import {formats, Format,} from './formatManager';

function replaceContent(html) {
    // TODO: kill UI, if needed
    // TODO: remove globals, if any

    document.open();

    document.write(html);

    document.close();
}

/**
 * @param {string} output
 * @param {string} fileName
 * @return {Promise<Blob>}
 */
function saveFile(output, fileName) {
    let blob;
    try {
        blob = new Blob(
            [output,],
            {
                type: 'text/html;charset=utf-8',
            }
        );

        saveAs(blob, fileName);
    } catch (e) {
        return Promise.reject(e);
    }

    return Promise.resolve(blob);
}

/**
 * @param {IStory} story
 * @return Format
 */
function getFormat(story) {
    let format = formats['SugarCube 2'];

    if (story.format) {
        if (formats[story.format] instanceof Format) {
            format = formats[story.format];
        } else {
            throw new Error(`Unknown story format: ${story.format}.
Currently supported formats: ${Object.keys(formats).join(', ')}`);
        }
    }

    return format;
}

/**
 * @param {IStory} story
 * @param {IPublishOptions} options
 * @param {string} fileName
 */
export function publishStory(story, options = {}, fileName) {
    let format;

    try {
        format = getFormat(story);
    } catch (e) {
        alert(e.message);
        return;
    }

    format.publish(story, options.formatOptions, options.startPassageId || 1).then(
        (compiledStory) => {
            saveFile(compiledStory, fileName);
        }
    );
}

/**
 * @param {IStory} story
 * @param {IPublishOptions} options
 */
export function playStory(story, options = {}) {
    let format;

    try {
        format = getFormat(story);
    } catch (e) {
        alert(e.message);
        return;
    }

    format.publish(story, options.formatOptions, options.startPassageId || 1).then(
        (compiledStory) => {
            replaceContent(compiledStory);
        }
    );
}