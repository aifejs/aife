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
            styleSheet: '',
            script: '',
            passages: [
                {
                    pid: 11,
                    tags: [],
                    text: 'Passage paragraph',
                    title: 'Eleventh passage',
                    position: {
                        x: 0, y: 0,
                    },
                },
                {
                    pid: 22,
                    tags: ['some tag',],
                    text: 'Another passage text',
                    title: 'Another passage',
                    position: {
                        x: 200, y: 200,
                    },
                },
            ],
            format: 'SugarCube 2',
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