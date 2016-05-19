import Overview from './components/Overview.vue';
import PassageEditor from './components/PassageEditor.vue';
import PassageDeleter from './components/PassageDeleter.vue';
import ProofRead from './components/ProofRead.vue';

const routerParams = {
    options: {
        root: '/',
        history: false,
        linkActiveClass: 'btn-primary',
    },

    aliases: {
        '/overview': '/',
    },

    routes: {
        '/': {
            name: 'overview',
            component: Overview,
            subRoutes: {
                '/delete/:pid': {
                    name: 'deletePassage',
                    component: PassageDeleter,
                },
                '/proofRead': {
                    name: 'proofRead',
                    component: ProofRead,
                },
            },
        },

        '/passage/:pid': {
            name: 'passage',
            component: PassageEditor,
        },
    },
};

export default routerParams;