import test from 'tape';
import {stripIndent,} from 'common-tags';
import {
    picklePassage,
    unpicklePassage,
    pickleStory,
    unpickleStory,
    caretPositionToPassage,
} from '../../../src/lib/pickle';

const testPassage0 = {
    title: 'Twisty little passages',
    text: 'They\'re incredibly all alike.',
    tags: [],
    pid: 0,
};

const testPassage1 = {
    title: 'Big cave',
    text: stripIndent`
    Biggest cave ever.
    You wonder if you can fit here your mom.`,
    tags: ['tag', 'lol, another tag',],
    pid: 1,
};

const testStory = [testPassage0, testPassage1,];

const testPassage0Pickled = stripIndent`
== Twisty little passages (0)

They're incredibly all alike.`;

const testPassage1Pickled = stripIndent`
== Big cave (1)
#tag #lol, another tag
Biggest cave ever.
You wonder if you can fit here your mom.`;

const testPickledStory = // TODO: find out why stripIndent works wrong here
    testPassage0Pickled +
    '\n=========================================================\n' +
    testPassage1Pickled;


test('pickle', (assert) => {
    assert.test('picklePassage', (assert) => {
        assert.plan(2);

        const pickled = picklePassage(testPassage0);
        assert.equals(
            pickled,
            testPassage0Pickled,
            'Pickled passage without tags correctly'
        );

        const pickledExtraSpicy = picklePassage(testPassage1);
        assert.equals(
            pickledExtraSpicy,
            testPassage1Pickled,
            'Pickled passage with tags correctly'
        );
    });

    assert.test('unpicklePassage', (assert) => {
        assert.plan(2);

        const unpickled = unpicklePassage(testPassage0Pickled);
        assert.deepEquals(
            unpickled,
            testPassage0,
            'Un-pickled passage without tags correctly'
        );

        const unpickledExtraSpicy = unpicklePassage(testPassage1Pickled);
        assert.deepEquals(
            unpickledExtraSpicy,
            testPassage1,
            'un-pickled passage with tags correctly'
        );
    });

    assert.test('pickleStory', (assert) => {
        assert.plan(1);

        const pickledStory = pickleStory(testStory);

        assert.equals(
            pickledStory,
            testPickledStory,
            'Correct story pickled successfully'
        );
    });

    assert.test('unpickleStory', (assert) => {
        assert.plan(2);

        const unpickledStory = unpickleStory(testPickledStory);
        assert.deepEquals(
            unpickledStory,
            testStory,
            'Correct story unpickled successfully'
        );

        const twoWayTestStory = unpickleStory(pickleStory(testStory));
        assert.deepEquals(
            twoWayTestStory,
            testStory,
            'Correctly pickled/unpickled story'
        );
    });

    assert.test('caretPositionToPassage', (assert) => {
        assert.plan(6);

        const pass0Length = testPassage0Pickled.length;
        const pass1Length = testPassage1Pickled.length;
        const delimLength = testPassage1Pickled.length;

        assert.equals(
            caretPositionToPassage(testPickledStory, 0),
            0,
            '0 resolves to 0th passage'
        );
        assert.equals(
            caretPositionToPassage(testPickledStory, pass0Length / 2),
            0,
            'Halfway through 0th passage still 0th passage'
        );
        assert.equals(
            caretPositionToPassage(testPickledStory, pass0Length + delimLength),
            1,
            '0th passage + delimiter gives 1st passage'
        );
        assert.equals(
            caretPositionToPassage(testPickledStory, pass0Length + delimLength + 10),
            1,
            'Delimiter between passages resolves to next passage'
        );
        assert.equals(
            caretPositionToPassage(testPickledStory, pass0Length + delimLength + pass1Length),
            1,
            'End of 1st passage gives 1st passage'
        );
        assert.equals(
            caretPositionToPassage(testPickledStory, testPickledStory.length * 2),
            1,
            'In a galaxy far away -- 1st passage'
        );

        // assert.equals(caretPositionToPassage(testPickledStory, ), 1);

    });
});