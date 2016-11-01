import Overview from './components/story/Overview.vue';
import PassageEditor from './components/passage/PassageEditor.vue';
import PassageDeleter from './components/passage/PassageDeleter.vue';
import ProofRead from './components/code/ProofRead.vue';

import ScriptEditor from './components/code/ScriptEditor.vue';
import StyleEditor from './components/code/StyleEditor.vue';
import HtmlEditor from './components/code/HtmlEditor.vue';

import StoryList from './components/storyList/StoryList.vue';
import Story from './components/story/Story.vue';
import StoryDeleter from './components/story/StoryDeleter.vue';
import StoryPlay from './components/story/export/StoryPlay.vue';
import StoryDebug from './components/story/export/StoryDebug.vue';
import StoryPublish from './components/story/export/StoryPublish.vue';

import Settings from './components/settings/Settings.vue';

/** @type VueRouter.RouterOptions */
const routerParams = {
    base: '/',
    history: false,
    linkActiveClass: 'active',

    routes: [
        {
            path: '/',
            name: 'stories',
            component: StoryList,
        },

        {
            path: '/story/:ifid',
            name: 'story',
            component: Story,

            children: [
                {
                    path: 'dashboard',
                    name: 'overview',
                    component: Overview,
                },

                {
                    path: 'deletePassage/:pid',
                    name: 'deletePassage',
                    component: PassageDeleter,
                },

                {
                    path: 'proofRead',
                    name: 'proofRead',
                    component: ProofRead,
                },

                {
                    path: 'passage/:pid',
                    name: 'passage',
                    component: PassageEditor,
                },

                {
                    path: 'script',
                    name: 'script',
                    component: ScriptEditor,
                },

                {
                    path: 'stylesheet',
                    name: 'stylesheet',
                    component: StyleEditor,
                },

                {
                    path: 'html',
                    name: 'html',
                    component: HtmlEditor,
                },

                {
                    path: 'deleteStory',
                    name: 'deleteStory',
                    component: StoryDeleter,
                },

                {
                    path: 'play',
                    name: 'play',
                    component: StoryPlay,
                },

                {
                    path: 'debug',
                    name: 'debug',
                    component: StoryDebug,
                },

                {
                    path: 'publish',
                    name: 'publish',
                    component: StoryPublish,
                },
            ],
        },

        {
            path: '/settings',
            name: 'settings',
            component: Settings,
        },
    ],
};

export default routerParams;