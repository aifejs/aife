import fetchJsonp from 'fetch-jsonp';
import escape from 'lodash/escape';
import exportStory from './exportStory';
import saveAs from 'browser-saveas';

function fetchFormat(url) {
    return fetchJsonp(url, {jsonpCallbackFunction: 'storyFormat',})
        .then((response) => response.json());
}

const format = {
    url: './storyFormats/Snowman/format.js',
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
                    },
                    (req, status, error) => {
                        reject(error);
                    }
                );
        });
    },

    storyNameRe: /\{\{STORY_NAME}}/g,
    storyDataRe: /\{\{STORY_DATA}}/g,

    publish(story, options, startId) {
        return this.load().then(
            () => {
                let output = this.properties.source;

                // use function replacements to protect the data from
                // accidental interactions with the special string
                // replacement patterns

                // builtin placeholders

                output = output.replace(this.storyNameRe, () => escape(story.title));

                output = output.replace(this.storyDataRe, () => exportStory(story));

                return output;
            }
        );
    },
};

function replaceContent(html) {
    // TODO: kill UI, if needed
    // TODO: remove globals, if any

    document.open();

    document.write(html);

    document.close();
}

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

export default function publishStory(story, filename, options = {}) {
    format.publish(story, options.formatOptions, options.startPassageId || 1).then(
        (compiledStory) => {
            if (filename) {
                saveFile(compiledStory, filename);
            } else {
                replaceContent(compiledStory);
            }
        },
        (err) => {
            alert(`An error occured while publishing your story: ${err}`);
        }
    );
}