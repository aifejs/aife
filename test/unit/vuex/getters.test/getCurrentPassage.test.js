import {getCurrentPassage,} from '../../../../src/vuex/getters';
import test from 'ava';
import {fixture, testState,} from '../../helpers/fixture';

test('getCurrentPassage', (assert) => {
    assert.plan(4);

    function state(routeParams) {
        return fixture({
            route: {
                params: Object.assign(
                    {
                        ifid: 'some-fake-ifid',
                    },
                    routeParams
                ),
            },
        });
    }

    assert.deepEqual(
        getCurrentPassage(state({pid: '11',})),
        testState.stories[0].passages[0],
        'Fetches correct passage by pid'
    );

    assert.is(
        getCurrentPassage(state({pid: '424242',})),
        undefined,
        'Fetches undefined with non-existing pid'
    );

    assert.deepEqual(
        getCurrentPassage(state({passageTitle: testState.stories[0].passages[1].title,})),
        testState.stories[0].passages[1],
        'Fetches correct passage by title'
    );

    assert.deepEqual(
        getCurrentPassage(state({passageTitle: 'No such passage',})),
        undefined,
        'Fetches undefined with non-existing title'
    );
});