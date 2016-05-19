import Vue from 'vue';

export default {
    name: 'sort-icon',
    bind() {
        this.el.classList.add('glyphicon');
    },

    update(newValue) {
        this.el.classList.toggle('glyphicon-sort-by-attributes', newValue === 'desc');
        this.el.classList.toggle('glyphicon-sort-by-attributes-alt', newValue === 'asc');
    },
};