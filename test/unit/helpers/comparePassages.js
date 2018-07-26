function compareArrays(arr1, arr2) {
    if (arr1 === arr2) {
        return true;
    } else if (arr1.length !== arr2.length) {
        return false;
    } else {
        for (const [index, elem,] of arr1.entries()) {
            if (elem !== arr2[index]) {
                return false;
            }
        }

        return true;
    }
}

/**
 * @param {IPassage} passage1
 * @param {IPassage} passage2
 * @return boolean
 */
export function textual(passage1, passage2) {
    return passage1.title === passage2.title &&
        passage1.text === passage2.text;
}

/**
 * @param {IPassage} passage1
 * @param {IPassage} passage2
 * @return boolean
 */
export function full(passage1, passage2) {
    return textual(passage1, passage2) &&
        compareArrays(passage1.tags, passage2.tags) &&
        passage1.pid === passage2.pid &&
        passage1.starting === passage2.starting &&
        passage1.position.x === passage2.position.x &&
        passage1.position.y === passage2.position.y;
}

/**
 * @param {IPassage[]} arr1
 * @param {IPassage[]} arr2
 * @return boolean
 */
export function arrayTextual(arr1, arr2) {
    for (const [index, passage,] of arr1.entries()) {
        if (!textual(passage, arr2[index])) {
            return false;
        }
    }

    return true;
}

/**
 * @param {IPassage[]} arr1
 * @param {IPassage[]} arr2
 * @return boolean
 */
export function arrayFull(arr1, arr2) {
    for (const [index, passage,] of arr1.entries()) {
        if (!full(passage, arr2[index])) {
            return false;
        }
    }

    return true;
}