const state = {
    route: {},
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
    passagesSorting: {
        field: 'pid',
        sort: 'desc',
    },
    opened: [],
    script: '',
    style: '',
    title: 'Humongous occurence',
};

export default state;