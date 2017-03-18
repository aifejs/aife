import test from 'tape';
import {fixture, testState,} from '../fixture';
import {textual,} from '../comparePassages';
import {proofReadCopy,} from '../../../../src/vuex/getters';
import {UPDATE_STORY_FROM_PROOF,} from '../../../../src/vuex/mutations';

// more thorough tests located in /test/unit/lib/pickle.test.js, this is just simple integration

test('UPDATE_STORY_FROM_PROOF', (assert) => {
    assert.plan(3);

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

    assert.ok(
        textual(
            state.stories[0].passages[1],
            testState.stories[0].passages[1]
        ),
        '2nd passage textually unchanged'
    );

    assert.deepEquals(
        {
            pid: state.stories[0].passages[1].pid,
            tags: state.stories[0].passages[1].tags,
        },
        {
            pid: testState.stories[0].passages[1].pid,
            tags: testState.stories[0].passages[1].tags,
        },
        '2nd passage other properties unchanged'
    );
});