import {jsEditorOptions,} from '../../../../src/vuex/getters';
import test from 'tape';

test('jsEditorOptions', (assert) => {
    const state = {
        codeEditorOptions: {},
    };

    assert.plan(1);

    assert.deepEquals(
        jsEditorOptions(state),
        {
            mode: 'javascript',
        },
        'correctly set editor mode to "javascript"'
    );
});