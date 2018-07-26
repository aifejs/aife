import Vue from 'vue';
import {library,} from '@fortawesome/fontawesome-svg-core';
import {
    faSortAmountUp,
    faSortAmountDown,
    faPencilAlt,
    faTrash,
    faCopy,
    faEdit,
    faCog,
    faBug,
    faRocket,
    faMinusSquare,
    faPlusSquare,
    faPlay,
    faTerminal,
    faDownload,
    faListUl,
    faWindowClose,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
    faCss3,
    faJs,
    faHtml5,
} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon,} from '@fortawesome/vue-fontawesome';

library.add(
    faSortAmountUp,
    faSortAmountDown,
    faPencilAlt,
    faTrash,
    faCopy,
    faEdit,
    faCog,
    faBug,
    faRocket,
    faMinusSquare,
    faPlusSquare,
    faPlay,
    faTerminal,
    faDownload,
    faListUl,
    faWindowClose,
    faSpinner,

    faCss3,
    faJs,
    faHtml5,
);

Vue.component('fa-icon', FontAwesomeIcon);