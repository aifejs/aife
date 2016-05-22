import {getCurrentPassage,} from '../../../../src/vuex/getters';
import test from 'tape';
import {testState, fixture,} from '../fixture';

test('getCurrentPassage', (assert) => {
    assert.plan(4);

    function state(routeParams) {
        return fixture({
            route: {
                params: routeParams,
            },
        });
    }

    assert.deepEquals(
        getCurrentPassage(state({pid: '11',})),
        testState.passages[0],
        'Fetches correct passage by pid'
    );

    assert.equals(
        getCurrentPassage(state({pid: '424242',})),
        undefined,
        'Fetches undefined with non-existing pid'
    );

    assert.deepEquals(
        getCurrentPassage(state({passageTitle: testState.passages[1].title,})),
        testState.passages[1],
        'Fetches correct passage by title'
    );

    assert.deepEquals(
        getCurrentPassage(state({passageTitle: 'No such passage',})),
        undefined,
        'Fetches undefined with non-existing title'
    );
});