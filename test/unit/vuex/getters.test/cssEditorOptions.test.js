import {cssEditorOptions,} from '../../../../src/vuex/getters';
import test from 'tape';

test('cssEditorOptions', (assert) => {
    const state = {
        codeEditorOptions: {},
    };

    assert.plan(1);

    assert.deepEquals(
        cssEditorOptions(state),
        {
            mode: 'css',
        },
        'correctly set editor mode'
    );
});