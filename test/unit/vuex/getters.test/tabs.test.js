import {tabs,} from '../../../../src/vuex/getters';
import test from 'tape';
import {testState,} from '../fixture';

test('tabs', (assert) => {
    assert.plan(2);

    const emptyState = {
        opened: [],
    };

    const notEmptyState = {
        opened: testState.passages,
    };

    assert.equals(
        tabs(emptyState).length,
        0,
        'empty array when no tabs is opened'
    );

    const nonEmptyTabs = tabs(notEmptyState);

    assert.deepEquals(
        nonEmptyTabs,
        [
            {pid: notEmptyState.opened[0].pid, title: notEmptyState.opened[0].title,},
            {pid: notEmptyState.opened[1].pid, title: notEmptyState.opened[1].title,},
        ],
        'correctly extracted only needed properties'
    );
});