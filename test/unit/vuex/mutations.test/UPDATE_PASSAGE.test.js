import test from 'ava';
import {fixture, testState,} from '../../helpers/fixture';
import {UPDATE_PASSAGE,} from '../../../../src/vuex/mutations';

test('UPDATE_PASSAGE', (assert) => {
    assert.plan(2);

    const state = fixture();
    const story = state.stories[0];

    UPDATE_PASSAGE(state, {
        pid: testState.stories[0].passages[0].pid,
        text: 'Look at me, I\'m completely different now',
    });

    assert.is(
        story.passages[0].text,
        'Look at me, I\'m completely different now',
        'Updated passage text correctly'
    );

    assert.is(
        story.passages[1].text,
        testState.stories[0].passages[1].text,
        'Another passages are not changed'
    );
});