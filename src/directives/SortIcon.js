export default {
    name: 'sort-icon',
    bind() {
        this.el.classList.add('fa');
    },

    update(newValue) {
        this.el.classList.toggle('fa-sort-amount-asc', newValue === 'asc');
        this.el.classList.toggle('fa-sort-amount-desc', newValue === 'desc');
    },
};