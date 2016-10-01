import {proofReadCopy,} from '../../../../src/vuex/getters';
import test from 'tape';
import {fixture,} from '../fixture';

// more thorough tests located in /test/unit/lib/pickle.test.js, this is just simple integration

test('proofReadCopy', (assert) => {
    assert.plan(4);

    const state = fixture();

    const testCopy = proofReadCopy(state);

    assert.ok(
        testCopy.startsWith('= Coolest story evah'),
        'Correctly copied title'
    );

    assert.ok(
        testCopy.includes('Eleventh'),
        'passage titles are in'
    );

    assert.ok(
        testCopy.includes('#some tag'),
        'tags are included'
    );

    assert.ok(
        testCopy.includes('Another'),
        'passage bodies are included too'
    );

    assert.ok(
        testCopy.includes('some-fake-ifid'),
        'ifid included'
    );
});