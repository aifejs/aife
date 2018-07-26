import {passagesOverview,} from '../../../../src/vuex/getters';
import test from 'ava';
import {fixture,} from '../../helpers/fixture';
import {arrayTextual,} from '../../helpers/comparePassages';

test('passagesOverview/passagesSorting', (assert) => {
    assert.plan(3);

    const state = fixture({
        passagesFiltering: '',
    });

    const passages = state.stories[0].passages;

    function sortingState(field = 'pid', sort = 'desc') {
        return Object.assign(
            {},
            state,
            {
                passagesSorting: {
                    field,
                    sort,
                },
            }
        );
    }

    assert.true(
        arrayTextual(
            passagesOverview(sortingState()),
            [passages[1], passages[0],]
        ),
        'Correctly sorting pid-desc'
    );

    assert.true(
        arrayTextual(
            passagesOverview(sortingState('title', 'asc')),
            [passages[1], passages[0],]
        ),
        'Correctly sorting title-as'
    );

    assert.true(
        arrayTextual(
            passagesOverview(sortingState('title', 'desc')),
            [passages[0], passages[1],]
        ),
        'Correctly sorting title-desc'
    );
});

test('passagesOverview/passagesFiltering', (assert) => {
    assert.plan(5);

    const state = fixture({
        passagesSorting: {
            field: 'pid',
            sort: 'desc',
        },
    });

    const passages = state.stories[0].passages;

    function filteringState(passagesFiltering) {
        state.passagesFiltering = passagesFiltering;

        return state;
    }

    assert.true(
        arrayTextual(
            passagesOverview(filteringState('pàragraph')),
            [passages[0],]
        ),
        'Filtering successfully finds passages despite diacritics'
    );

    assert.true(
        arrayTextual(
            passagesOverview(filteringState('TEXT')),
            [passages[1],]
        ),
        'Filtering successfully finds passages case-insensitive'
    );

    assert.true(
        arrayTextual(
            passagesOverview(filteringState('TÈXT')),
            [passages[1],]
        ),
        'Filtering successfully ignoring case and diacritics'
    );

    assert.is(
        passagesOverview(filteringState('Snark')).length,
        0,
        'Non-existent word yields empty result'
    );

    assert.is(
        passagesOverview(filteringState('')).length,
        2,
        'Empty search yields all passages'
    );
});

test('passagesOverview/sorting and filtering', (assert) => {
    assert.plan(3);

    const state = fixture();

    const passages = state.stories[0].passages;

    passages.push({
        pid: 100500,
        title: 'Xyzzy',
        text: 'ok, you caught me',
        tags: [],
        position: {
            x: 300,
            y: 300,
        },
    });

    function filteringSorting(field = 'pid', sort = 'asc', passagesFiltering = '') {
        return Object.assign(state, {
            passagesSorting: {
                field,
                sort,
            },
            passagesFiltering,
        });
    }

    assert.true(
        arrayTextual(
            passagesOverview(filteringSorting()),
            [passages[0], passages[1], passages[2],]
        ),
        'Without filtering and with default sorting passages list is identical to what is in store'
    );

    assert.true(
        arrayTextual(
            passagesOverview(filteringSorting('pid', 'desc', 'passage')),
            [passages[1], passages[0],]
        ),
        'Correctly sorts by pid-desc'
    );

    assert.true(
        arrayTextual(
            passagesOverview(filteringSorting('pid', 'asc', 'passage')),
            [passages[0], passages[1],]
        ),
        'Correctly sorts by pid-asc'
    );
});