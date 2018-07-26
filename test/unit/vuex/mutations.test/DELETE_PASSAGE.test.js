import test from 'ava';
import {fixture, testState,} from '../../helpers/fixture';
import {DELETE_PASSAGE,} from '../../../../src/vuex/mutations';

test('DELETE_PASSAGE', (assert) => {
    assert.plan(3);

    const state = fixture();
    const story = state.stories[0];
    story.opened.push(story.passages[0], story.passages[1]);
    DELETE_PASSAGE(state, testState.stories[0].passages[0].pid);

    assert.is(
        story.opened.length,
        1,
        'One opened passage left after deleting'
    );

    assert.is(
        story.passages.length,
        1,
        'One passage less'
    );

    DELETE_PASSAGE(state, 451);

    assert.is(
        story.passages.length,
        1,
        'Nothing changed after attempting to delete non-existing passage'
    );
});