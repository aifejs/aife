const state = {
    route: {},

    title: 'Humongous occurence',
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

    passagesSorting: {
        field: 'pid',
        sort: 'desc',
    },
    passagesFiltering: '',
    opened: [],

    codeEditorOptions: {
        lineWrapping: true,
        lineNumbers: true,
        indentUnit: 4,
    },
};

export default state;