import countWords from '../../../src/lib/countWords';
import test from 'tape';

test('countWords', (assert) => {
    assert.plan(4);

    assert.equals(
        countWords('some  words\twith\nvarious delimeters'),
        5,
        'Correctly counted words in string with various delimeters'
    );

    assert.equals(
        countWords(''),
        0,
        'Correctly counted words in empty string'
    );

    assert.equals(
        countWords(['some  ', 'words', '\twith\nvarious ', 'delimeters',]),
        5,
        'Correctly counted words in array'
    );

    assert.equals(
        countWords([]),
        0,
        'Correctly counted words in empty array'
    );
});