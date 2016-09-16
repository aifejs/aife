import test from 'tape';
import {fixture, testState,} from '../fixture';
import {proofReadCopy,} from '../../../../src/vuex/getters';
import {UPDATE_STORY_FROM_PROOF,} from '../../../../src/vuex/mutations';

// more thorough tests located in /test/unit/lib/pickle.test.js, this is just simple integration

test('UPDATE_STORY_FROM_PROOF', (assert) => {
    assert.plan(2);

    const state = fixture();
    const copy = proofReadCopy(state).replace('paragraph', 'piece');

    UPDATE_STORY_FROM_PROOF(
        state,
        copy
    );

    assert.equals(
        state.stories[0].passages[0].text,
        'Passage piece',
        'Changed 1st passage'
    );

    assert.deepEquals(
        state.stories[0].passages[1],
        testState.stories[0].passages[1],
        '2nd pasage unchanged'
    );
});