const state = {
    route: {},

    stories: [],

    passagesSorting: {
        field: 'pid',
        sort: 'asc',
    },

    storiesSorting: {
        field: 'title',
        sort: 'asc',
    },

    passagesFiltering: '',

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