import {stats,} from '../../../../src/vuex/getters';
import test from 'tape';
import {fixture,} from '../fixture';

test('stats', (assert) => {
    assert.plan(2);

    const emptyStoryState = fixture();
    emptyStoryState.stories[0].passages.length = 0;

    assert.deepEquals(
        stats(emptyStoryState),
        {
            words: 0,
            characters: 0,
            passages: 0,
            code: 0,
            charactersAll: 0,
        },
        'Correctly counted words and characters in empty story'
    );

    assert.deepEquals(
        stats(fixture()),
        {
            words: 11,
            characters: 70,
            charactersAll: 76,
            passages: 2,
            code: 0,
        },
        'Correctly counted words and characters in test story'
    );

    assert.end();
});