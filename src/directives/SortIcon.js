export default {
    name: 'sort-icon',
    bind(el) {
        el.classList.add('fa');
    },

    update(el, {value,}) {
        el.classList.toggle('fa-sort-amount-asc', value === 'asc');
        el.classList.toggle('fa-sort-amount-desc', value === 'desc');
    },
};