import fetchJsonp from 'fetch-jsonp';
import escape from 'lodash/escape';
import exportStory from './exportStory';

/**
 * @param {string} url
 * @return {Promise<IFormatProperties>}
 */
function fetchFormat(url) {
    return fetchJsonp(url, {jsonpCallbackFunction: 'storyFormat',})
        .then((response) => response.json());
}

/**
 * @param {IStory} story
 * @return {string|boolean}
 */
function getCustomHtml(story) {
    if (story.customHtml && story.customHtml.trim().length) {
        return story.customHtml;
    } else {
        return false;
    }
}

export class Format {
    /**
     * @param {string} url
     */
    constructor(url) {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            this.url = url;
        } else {
            this.url = `./storyFormats/${encodeURIComponent(url)}/format.js`;
        }
    }

    /**
     * @return {Promise}
     */
    load() {
        return new Promise((resolve, reject) => {
            if (this.loaded) {
                return resolve();
            }

            fetchFormat(this.url)
                .then(
                    (properties) => {
                        this.properties = properties;
                        this.loaded = true;

                        if (this.properties.setup) {
                            this.properties.setup.call(this);
                        }

                        resolve();
                    }
                )
                .catch(reject);
        });
    }

    /**
     * @param {IStory} story
     * @param {Array} formatOptions
     * @param {number} startId
     * @return {Promise<string>}
     */
    publish(story, formatOptions, startId) {
        return this.load().then(
            () => {
                let output = getCustomHtml(story) || this.properties.source;

                // use function replacements to protect the data from
                // accidental interactions with the special string
                // replacement patterns

                // builtin placeholders

                output = output.replace(Format.storyNameRe, () => escape(story.title));

                output = output.replace(Format.storyDataRe, () => exportStory(story, formatOptions));

                return output;
            }
        );
    }

    get iconUrl() {
        return this.url.replace(/format\.js$/, 'icon.svg');
    }

    static get storyNameRe() {
        return /\{\{STORY_NAME}}/g;
    }

    static get storyDataRe() {
        return /\{\{STORY_DATA}}/g;
    }
}

export const documentations = {
    'SugarCube': 'http://www.motoslave.net/sugarcube/1/',
    'SugarCube 2': 'http://www.motoslave.net/sugarcube/2/',
    'Snowman': 'https://bitbucket.org/klembot/snowman-2',
    'Harlowe': 'https://twine2.neocities.org/',
};

export const formats = {
    'SugarCube': new Format('SugarCube'),
    'SugarCube 2': new Format('SugarCube 2'),
    'Snowman': new Format('Snowman'),
    'Harlowe': new Format('Harlowe'),
};