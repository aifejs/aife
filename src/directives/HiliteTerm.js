/**
 * This directive highlights passed term in element, by wrapping it with <strong></strong>.
 * No need to optimize it, because if term is not present in element, entire element would be hidden by filtering
 */
export default {
    name: 'hilite-term',

    priority: 100,

    bind() {
        this.originalText = this.el.innerHTML;
    },

    update(newTermValue) {
        if (newTermValue.length) {
            const re = new RegExp(newTermValue, 'img');

            if (this.originalText.match(re)) {
                this.el.innerHTML = this.originalText.replace(re, `<strong>${newTermValue}</strong>`);
            } else {
                this.el.innerHTML = this.originalText;
            }
        } else {
            this.el.innerHTML = this.originalText;
        }
    },

    unbind() {
        this.el.innerHTML = this.originalText;
    },
};