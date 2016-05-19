export default function countWords(text) {
    return text.split(/\s+/mg).length;
}