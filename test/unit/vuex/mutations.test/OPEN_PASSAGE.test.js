import test from 'tape';
import {fixture,} from '../fixture';
import {OPEN_PASSAGE,} from '../../../../src/vuex/mutations';

test('OPEN_PASSAGE', (assert) => {
    assert.plan(3);

    const state = fixture();
    const story = state.stories[0];

    OPEN_PASSAGE(state, 11);

    assert.deepEquals(
        story.opened[0],
        story.passages[0],
        'Correctly opened passage'
    );

    OPEN_PASSAGE(state, 256);

    assert.equals(
        story.opened.length,
        1,
        'Changed nothing after attempt to open non-existent passage'
    );

    assert.equal(
        story.passages.length,
        2,
        'Overall passages length not changed'
    );
});