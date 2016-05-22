export default function countWords(text) {
    if (Array.isArray(text)) {
        if (text.length === 0) {
            return 0;
        }

        return text.reduce(
            (accumulator, item) => accumulator += countWords(item),
            0
        );
    } else {
        if (text.trim().length === 0) {
            return 0;
        } else {
            return text.trim().split(/\s+/mg).length;
        }
    }
}