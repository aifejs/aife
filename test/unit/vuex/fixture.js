import cloneDeep from 'lodash/cloneDeep';
const ifid = 'some-fake-ifid';

export const testState = {
    route: {
        params: {
            ifid,
        },
    },

    stories: [
        {
            title: 'Coolest story evah',
            ifid,
            opened: [],
            passages: [
                {
                    pid: 11,
                    tags: [],
                    text: 'Passage paragraph',
                    title: 'Eleventh passage',
                },
                {
                    pid: 22,
                    tags: ['some tag',],
                    text: 'Another passage text',
                    title: 'Another passage',
                },
            ],
        },
    ],
};

export function fixture(additionalProps = {}) {
    return Object.assign(
        {},
        cloneDeep(testState),
        additionalProps
    );
}