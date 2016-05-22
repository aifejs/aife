import test from 'tape';
import {fixture, testState,} from '../fixture';
import {DELETE_PASSAGE,} from '../../../../src/vuex/mutations';

test('DELETE_PASSAGE', (assert) => {
    assert.plan(3);

    const state = fixture({
        opened: [
            testState.passages[0],
            testState.passages[1],
        ],
    });

    DELETE_PASSAGE(state, testState.passages[0].pid);

    assert.equal(
        state.opened.length,
        1,
        'One opened passage left after deleting'
    );

    assert.equal(
        state.passages.length,
        1,
        'One passage less'
    );

    DELETE_PASSAGE(state, 451);

    assert.equal(
        state.passages.length,
        1,
        'Nothing changed after attempting to delete non-existing passage'
    );
});