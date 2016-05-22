import test from 'tape';
import {fixture, testState,} from '../fixture';
import {UPDATE_PASSAGE,} from '../../../../src/vuex/mutations';

test('UPDATE_PASSAGE', (assert) => {
    assert.plan(2);

    const state = fixture({});

    UPDATE_PASSAGE(state, {
        pid: testState.passages[0].pid,
        text: 'Look at me, I\'m completely different now',
    });

    assert.equals(
        state.passages[0].text,
        'Look at me, I\'m completely different now',
        'Updated passage text correctly'
    );

    assert.equals(
        state.passages[1].text,
        testState.passages[1].text,
        'Another passages are not changed'
    );
});