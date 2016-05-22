import {passagesOverview,} from '../../../../src/vuex/getters';
import test from 'tape';
import {testState, fixture,} from './fixture';

test('passagesOverview', (assert) => {
    assert.test('passagesSorting', (assert) => {
        assert.plan(3);

        const state = fixture({
            passagesFiltering: '',
        });

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

        assert.deepEquals(
            passagesOverview(sortingState()),
            [state.passages[1], state.passages[0],],
            'Correctly sorting pid-desc'
        );

        assert.deepEquals(
            passagesOverview(sortingState('title', 'asc')),
            [state.passages[1], state.passages[0],],
            'Correctly sorting title-asc'
        );

        assert.deepEquals(
            passagesOverview(sortingState('title', 'desc')),
            [state.passages[0], state.passages[1],],
            'Correctly sorting title-desc'
        );
    });

    assert.test('passagesFiltering', (assert) => {
        assert.plan(5);

        const state = fixture({
            passagesSorting: {
                field: 'pid',
                sort: 'desc',
            },
        });

        function filteringState(passagesFiltering) {
            state.passagesFiltering = passagesFiltering;

            return state;
        }

        assert.deepEquals(
            passagesOverview(filteringState('pàragraph')),
            [
                state.passages[0],
            ],
            'Filtering successfully finds passages despite diacritics'
        );

        assert.deepEquals(
            passagesOverview(filteringState('TEXT')),
            [
                state.passages[1],
            ],
            'Filtering successfully finds passages case-insensitive'
        );

        assert.deepEquals(
            passagesOverview(filteringState('TÈXT')),
            [
                state.passages[1],
            ],
            'Filtering successfully ignoring case and diacritics'
        );

        assert.equals(
            passagesOverview(filteringState('Snark')).length,
            0,
            'Non-existent word yields empty result'
        );

        assert.equals(
            passagesOverview(filteringState('')).length,
            2,
            'Empty search yields all passages'
        );
    });

    assert.test('sorting and filtering', (assert) => {
        assert.plan(3);

        const state = fixture({
            passages: [
                ...testState.passages,
                {
                    pid: 100500,
                    title: 'Xyzzy',
                    text: 'ok, you caught me',
                },
            ],
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

        assert.deepEquals(
            passagesOverview(filteringSorting()),
            [
                state.passages[0],
                state.passages[1],
                state.passages[2],
            ],
            'Without filtering and with default sorting passages list is identical to what is in store'
        );

        assert.deepEquals(
            passagesOverview(filteringSorting('pid', 'desc', 'passage')),
            [
                state.passages[1],
                state.passages[0],
            ],
            'Correctly sorts by pid-desc'
        );

        assert.deepEquals(
            passagesOverview(filteringSorting('pid', 'asc', 'passage')),
            [
                state.passages[0],
                state.passages[1],
            ],
            'Correctly sorts by pid-asc'
        );
    });
});