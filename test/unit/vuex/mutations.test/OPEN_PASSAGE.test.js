import test from 'tape';
import {fixture, testState,} from '../fixture';
import {OPEN_PASSAGE,} from '../../../../src/vuex/mutations';

test('OPEN_PASSAGE', (assert) => {
    assert.plan(3);

    const state = fixture({
        opened: [],
    });

    OPEN_PASSAGE(state, 11);

    assert.deepEquals(
        state.opened[0],
        testState.passages[0],
        'Correctly opened passage'
    );

    OPEN_PASSAGE(state, 256);

    assert.equals(
        state.opened.length,
        1,
        'Changed nothing after attempt to open non-existent passage'
    );

    assert.equal(
        state.passages.length,
        2,
        'Overall passages length not changed'
    );
});