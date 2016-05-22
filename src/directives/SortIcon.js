export default {
    name: 'sort-icon',
    bind() {
        this.el.classList.add('glyphicon');
    },

    update(newValue) {
        this.el.classList.toggle('glyphicon-sort-by-attributes', newValue === 'asc');
        this.el.classList.toggle('glyphicon-sort-by-attributes-alt', newValue === 'desc');
    },
};