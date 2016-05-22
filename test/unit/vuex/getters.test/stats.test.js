import {stats,} from '../../../../src/vuex/getters';
import test from 'tape';
import {testState,} from './fixture';

test('stats', (assert) => {
    assert.plan(2);

    assert.deepEquals(
        stats({passages: [],}),
        {
            words: 0,
            characters: 0,
            passages: 0,
        },
        'Correctly counted words and characters in empty story'
    );

    assert.deepEquals(
        stats(testState),
        {
            words: 11,
            characters: 76,
            passages: 2,
        },
        'Correctly counted words and characters in test story'
    );
});