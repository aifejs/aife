import {cssEditorOptions,} from '../../../../src/vuex/getters';
import test from 'ava';

test('cssEditorOptions', (assert) => {
    const state = {
        codeEditorOptions: {},
    };

    assert.plan(1);

    assert.deepEqual(
        cssEditorOptions(state),
        {
            mode: 'css',
        },
        'correctly set editor mode'
    );
});