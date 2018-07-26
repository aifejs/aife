import {jsEditorOptions,} from '../../../../src/vuex/getters';
import test from 'ava';

test('jsEditorOptions', (assert) => {
    const state = {
        codeEditorOptions: {},
    };

    assert.plan(1);

    assert.deepEqual(
        jsEditorOptions(state),
        {
            mode: 'javascript',
        },
        'correctly set editor mode to "javascript"'
    );
});