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
    },

    storiesLoaded: false,
    proofModeError: false,
};

export default state;