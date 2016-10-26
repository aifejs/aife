/**
 * This directive highlights passed term in element, by wrapping it with <strong></strong>.
 * No need to optimize it, because if term is not present in element, entire element would be hidden by filtering
 */
export default {
    name: 'hilite-term',

    priority: 100,

    bind(el) {
        el.dataset.originalText = el.innerHTML;
    },

    update(el, {value,}) {
        const originalText = el.dataset.originalText;

        if (value.length) {
            const re = new RegExp(value, 'img');

            if (originalText.match(re)) {
                el.innerHTML = originalText.replace(re, `<strong>${value}</strong>`);
            } else {
                el.innerHTML = originalText;
            }
        } else {
            el.innerHTML = originalText;
        }
    },

    unbind(el) {
        el.innerHTML = el.dataset.originalText;
    },
};