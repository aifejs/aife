import {passagesOverview,} from '../../../../src/vuex/getters';
import test from 'tape';
import {fixture,} from '../fixture';
import {arrayTextual,} from '../comparePassages';

test('passagesOverview', (assert) => {
    assert.test('passagesSorting', (assert) => {
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

        assert.ok(
            arrayTextual(
                passagesOverview(sortingState()),
                [passages[1], passages[0],]
            ),
            'Correctly sorting pid-desc'
        );

        assert.ok(
            arrayTextual(
                passagesOverview(sortingState('title', 'asc')),
                [passages[1], passages[0],]
            ),
            'Correctly sorting title-as'
        );

        assert.ok(
            arrayTextual(
                passagesOverview(sortingState('title', 'desc')),
                [passages[0], passages[1],]
            ),
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

        const passages = state.stories[0].passages;

        function filteringState(passagesFiltering) {
            state.passagesFiltering = passagesFiltering;

            return state;
        }

        assert.ok(
            arrayTextual(
                passagesOverview(filteringState('pàragraph')),
                [passages[0],]
            ),
            'Filtering successfully finds passages despite diacritics'
        );

        assert.ok(
            arrayTextual(
                passagesOverview(filteringState('TEXT')),
                [passages[1],]
            ),
            'Filtering successfully finds passages case-insensitive'
        );

        assert.ok(
            arrayTextual(
                passagesOverview(filteringState('TÈXT')),
                [passages[1],]
            ),
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

        const state = fixture();

        const passages = state.stories[0].passages;

        passages.push({
            pid: 100500,
            title: 'Xyzzy',
            text: 'ok, you caught me',
            tags: [],
            position: {x: 300, y: 300,},
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

        assert.ok(
            arrayTextual(
                passagesOverview(filteringSorting()),
                [passages[0], passages[1], passages[2],]
            ),
            'Without filtering and with default sorting passages list is identical to what is in store'
        );

        assert.ok(
            arrayTextual(
                passagesOverview(filteringSorting('pid', 'desc', 'passage')),
                [passages[1], passages[0],]
            ),
            'Correctly sorts by pid-desc'
        );

        assert.ok(
            arrayTextual(
                passagesOverview(filteringSorting('pid', 'asc', 'passage')),
                [passages[0], passages[1],]
            ),
            'Correctly sorts by pid-asc'
        );
    });
});