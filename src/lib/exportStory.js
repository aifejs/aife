import {stripIndent,} from 'common-tags';

export default function exportStory(story) {
    return stripIndent`
<tw-storydata 
    name="${story.title}"
    startnode="1"
    creator="Aife"
    ifid="${story.ifid}"
    format="Snowman"
    hidden>
    <style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">${story.styleSheet}</style>
    <script role="script" id="twine-user-script" type="text/twine-javascript">${story.script}</script>
    ${story.passages.map(exportPassage)}
</tw-storydata>`;
}

function exportPassage(passage) {
    return stripIndent`
        <tw-passagedata 
            pid="${passage.pid}" 
            name="${passage.title}" 
            tags="${passage.tags.join(', ')}"
            >${passage.text}</tw-passagedata>`;
}