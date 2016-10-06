import Overview from './components/story/Overview.vue';
import PassageEditor from './components/passage/PassageEditor.vue';
import PassageDeleter from './components/passage/PassageDeleter.vue';
import ProofRead from './components/ProofRead.vue';

import ScriptEditor from './components/ScriptEditor.vue';
import StyleSheetEditor from './components/StyleSheetEditor.vue';

import StoryList from './components/story/StoryList.vue';
import Story from './components/story/Story.vue';
import StoryDeleter from './components/story/StoryDeleter.vue';

import Settings from './components/settings/Settings.vue';

import {playStory, publishStory,} from './lib/publishStory';
import {getCurrentStory,} from './vuex/getters';

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

                '/play': {
                    name: 'play',
                    component: {
                        ready() {
                            playStory(this.story, {});
                        },

                        vuex: {
                            getters: {
                                story: getCurrentStory,
                            },
                        },
                    },
                },

                '/publish': {
                    name: 'publish',
                    component: {
                        ready() {
                            publishStory(this.story, {}, `${this.story.title}.html`);
                        },
                        vuex: {
                            getters: {
                                story: getCurrentStory,
                            },
                        },
                    },
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