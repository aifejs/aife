import test from 'ava';
import countWords from '../../../src/lib/countWords';

test('countWords', (assert) => {
    assert.plan(4);

    assert.is(
        countWords('some  words\twith\nvarious delimeters'),
        5,
        'Correctly counted words in string with various delimeters'
    );

    assert.is(
        countWords(''),
        0,
        'Correctly counted words in empty string'
    );

    assert.is(
        countWords(['some  ', 'words', '\twith\nvarious ', 'delimeters',]),
        5,
        'Correctly counted words in array'
    );

    assert.is(
        countWords([]),
        0,
        'Correctly counted words in empty array'
    );
});