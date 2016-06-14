import {ajax,} from 'jquery';
import {escape,} from 'lodash';
import exportStory from './exportStory';

const format = {
    load() {
        return new Promise((resolve, reject) => {
            if (this.loaded) {
                return resolve();
            }

            ajax({
                url: '/storyFormats/Snowman/format.js',
                dataType: 'jsonp',
                jsonpCallback: 'storyFormat',
                crossDomain: true,
            }).then(
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

    publish(story, options, startId) {
        return this.load().then(
            () => {
                let output = this.properties.source;

                // use function replacements to protect the data from
                // accidental interactions with the special string
                // replacement patterns

                // builtin placeholders

                output = output.replace(/\{\{STORY_NAME\}\}/g, () => escape(story.title));

                output = output.replace(/\{\{STORY_DATA\}\}/g, () => exportStory(story));

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

export default function publishStory(story, filename, options = {}) {
    format.publish(story, options.formatOptions, options.startPassageId || 1).then(
        (output) => {
            if (filename) {
                saveFile(output, filename);
            } else {
                replaceContent(output);
            }
        },
        (err) => {
            alert(`An error occured while publishing your story: ${err}`);
        }
    );
}