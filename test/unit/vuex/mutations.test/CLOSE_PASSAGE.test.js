import test from 'ava';
import {fixture,} from '../../helpers/fixture';
import {CLOSE_PASSAGE,} from '../../../../src/vuex/mutations';

test('CLOSE_PASSAGE', (assert) => {
    const state = fixture();
    const story = state.stories[0];
    story.opened = [story.passages[0], story.passages[1],];

    CLOSE_PASSAGE(state, story.passages[0].pid);

    assert.is(
        story.opened.length,
        1,
        'One opened passage left after closing'
    );

    CLOSE_PASSAGE(state, 451);

    assert.is(
        story.opened.length,
        1,
        'Nothing changed after attempting to close non-existing passage'
    );
});