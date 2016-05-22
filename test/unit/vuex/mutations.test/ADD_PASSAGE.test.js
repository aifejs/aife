import test from 'tape';
import {fixture, testState,} from '../fixture';
import {ADD_PASSAGE,} from '../../../../src/vuex/mutations';

test('ADD_PASSAGE', (assert) => {
    assert.plan(2);

    const state = fixture();

    ADD_PASSAGE(state, {
        title: 'Yet another passage',
        text: 'Straight big passages, very distinct',
        tags: [],
    });


    assert.equals(
        state.passages.length,
        3,
        'Added 1 new passage'
    );

    assert.equals(
        state.passages[2].pid,
        23,
        'correctly assigns new pid'
    );
});