export const testState = {
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
};

export function fixture(additionalProps = {}) {
    return Object.assign(
        {},
        testState,
        additionalProps
    );
}