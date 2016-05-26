const state = {
    route: {},

    stories: [
        {
            title: 'Humongous occurence',
            ifid: 'F51FC123-28AA-4A30-A591-7E4D78EFB2D5',
            lastEdit: 1464294831088,
            passages: [
                {
                    title: 'Twisty little passages',
                    text: 'They\'re incredibly all alike.',
                    tags: [],
                    pid: 0,
                },
                {
                    title: 'Big cave',
                    text: 'Biggest cave ever. You wonder if you can fit whale here.',
                    tags: ['tag', 'lol, another tag',],
                    pid: 1,
                },
                {
                    title: 'Ach, it\'s your room',
                    text: 'It was all a dream.',
                    tags: ['tag', 'no way, man:(',],
                    pid: 42,
                },
            ],
            script: 'alert(42);',
            styleSheet: '',
        },
    ],

    passagesSorting: {
        field: 'pid',
        sort: 'asc',
    },

    storiesSorting: {
        field: 'title',
        sort: 'asc',
    },

    passagesFiltering: '',

    opened: [],
    editStylesheet: false,
    editScript: false,
    proofRead: false,

    codeEditorOptions: {
        lineWrapping: true,
        lineNumbers: true,
        indentUnit: 4,
    },
};

export default state;