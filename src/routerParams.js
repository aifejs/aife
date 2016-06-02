import Overview from './components/Overview.vue';
import PassageEditor from './components/PassageEditor.vue';
import PassageDeleter from './components/PassageDeleter.vue';
import ProofRead from './components/ProofRead.vue';

import ScriptEditor from './components/ScriptEditor.vue';
import StyleSheetEditor from './components/StyleSheetEditor.vue';

import StoryList from './components/story/StoryList.vue';
import Story from './components/story/Story.vue';
import StoryDeleter from './components/story/StoryDeleter.vue';

import Settings from './components/settings/Settings.vue';

const routerParams = {
    options: {
        root: '/',
        history: false,
        linkActiveClass: 'active',
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

                '/deletePassage/:pid': {
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

                '/deleteStory': {
                    name: 'deleteStory',
                    component: StoryDeleter,
                },
            },
        },
        
        '/settings/': {
            name: 'settings',
            component: Settings,
        },
    },
};

export default routerParams;