import {proofReadCopy,} from '../../../../src/vuex/getters';
import test from 'tape';
import {fixture,} from '../fixture';

test('proofReadCopy', (assert) => {
    assert.plan(4);

    const testCopy = proofReadCopy(fixture({title: 'I am but a humble fixture',}));

    assert.equals(
        testCopy.title,
        'I am but a humble fixture',
        'Correctly copied title'
    );

    assert.ok(
        testCopy.passages.includes('Eleventh'),
        'passage titles are in'
    );

    assert.ok(
        testCopy.passages.includes('#some tag'),
        'tags are included'
    );

    assert.ok(
        testCopy.passages.includes('Another'),
        'passage bodies are included too'
    );
});