import {proofReadCopy,} from '../../../../src/vuex/getters';
import test from 'ava';
import {fixture,} from '../../helpers/fixture';

// more thorough tests located in /test/unit/lib/pickle.test.js, this is just simple integration

test('proofReadCopy', (assert) => {
    assert.plan(5);

    const state = fixture();

    const testCopy = proofReadCopy(state);

    assert.true(
        testCopy.startsWith('= Coolest story evah'),
        'Correctly copied title'
    );

    assert.true(
        testCopy.includes('Eleventh'),
        'passage titles are in'
    );

    assert.true(
        testCopy.includes('#some tag'),
        'tags are included'
    );

    assert.true(
        testCopy.includes('Another'),
        'passage bodies are included too'
    );

    assert.true(
        testCopy.includes('some-fake-ifid'),
        'ifid included'
    );
});