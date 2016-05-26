import Overview from './components/Overview.vue';
import PassageEditor from './components/PassageEditor.vue';
import PassageDeleter from './components/PassageDeleter.vue';
import ProofRead from './components/ProofRead.vue';

import ScriptEditor from './components/ScriptEditor.vue';
import StyleSheetEditor from './components/StyleSheetEditor.vue';

import StoryList from './components/story/StoryList.vue';
import Story from './components/story/Story.vue';

const routerParams = {
    options: {
        root: '/',
        history: false,
        linkActiveClass: 'btn-primary',
    },

    routes: {
        '/': {
            name: 'stories',
            component: StoryList,
        },

        '/story/:ifid': {
            name: 'story',
            component: Story,

            subRoutes: {
                '/': {
                    name: 'overview',
                    component: Overview,
                },

                '/delete/:pid': {
                    name: 'deletePassage',
                    component: PassageDeleter,
                },

                '/proofRead': {
                    name: 'proofRead',
                    component: ProofRead,
                },

                '/passage/:pid': {
                    name: 'passage',
                    component: PassageEditor,
                },

                '/script': {
                    name: 'script',
                    component: ScriptEditor,
                },

                '/stylesheet': {
                    name: 'stylesheet',
                    component: StyleSheetEditor,
                },
            },
        },
    },
};

export default routerParams;