/** @type IState */
const state = {
    /** @type IRoute */
    route: {},

    /** @type IStory[] */
    stories: [],

    /** @type ISorting */
    passagesSorting: {
        field: 'pid',
        sort: 'asc',
    },

    /** @type ISorting */
    storiesSorting: {
        field: 'title',
        sort: 'asc',
    },

    passagesFiltering: '',

    /** @type IEditorOptions */
    codeEditorOptions: {
        lineWrapping: true,
        lineNumbers: true,
        indentUnit: 4,
        gutters: ['CodeMirror-lint-markers',],
        lint: true,
    },

    storiesLoaded: false,
    proofModeError: false,
};

export default state;