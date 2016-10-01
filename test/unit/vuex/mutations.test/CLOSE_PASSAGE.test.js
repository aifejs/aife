import test from 'tape';
import {fixture, testState,} from '../fixture';
import {CLOSE_PASSAGE,} from '../../../../src/vuex/mutations';

test('CLOSE_PASSAGE', (assert) => {
    // assert.plan(2);

    const state = fixture();
    const story = state.stories[0];
    story.opened = [story.passages[0], story.passages[1],];

    CLOSE_PASSAGE(state, story.passages[0].pid);

    assert.equal(
        story.opened.length,
        1,
        'One opened passage left after closing'
    );

    CLOSE_PASSAGE(state, 451);

    assert.equal(
        story.opened.length,
        1,
        'Nothing changed after attempting to close non-existing passage'
    );

    assert.end();
});