import test from 'ava';
import {fixture, testState,} from '../../helpers/fixture';
import {textual,} from '../../helpers/comparePassages';
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

    assert.is(
        state.stories[0].passages[0].text,
        'Passage piece',
        'Changed 1st passage'
    );

    assert.true(
        textual(
            state.stories[0].passages[1],
            testState.stories[0].passages[1]
        ),
        '2nd passage textually unchanged'
    );

    assert.deepEqual(
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