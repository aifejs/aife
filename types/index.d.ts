type Dictionary<T> = { [key: string]: T };

interface IStory {
    title: string,
    ifid: string,
    passages: IPassage[],
    opened: IPassage[],
    styleSheet: string,
    editStylesheet: boolean,
    script: string,
    editScript: boolean,
    customHtml: string,
    editCustomHtml: boolean,
    editProof: boolean,
    lastEdit: Date | number,
    format: string,
}

interface IPassage {
    title: string,
    text: string,
    pid: number,
    tags: string[],
    starting: boolean,
}

interface ITwineStory {
    startPassagePid: number,
    name: string,
    ifid: string,
    lastUpdate: Date,
    script: string,
    stylesheet: string,
    zoom: number,
    passages: ITwinePassage[],
    format: string,
}

interface ITwinePassage {
    pid: string,
    left: number,
    top: number,
    width: number,
    height: number,
    tags: string[],
    name: string,
    text: string,
}


interface ISorting {
    field: string,
    sort: 'asc' | 'desc',
}

interface IEditorOptions {
    lineWrapping: boolean,
    lineNumbers: boolean,
    indentUnit: number,
    gutters: string[],
    lint: boolean,
    mode?: string,
}

import VueRouter from 'vue-router'

interface IRoute {
    params?: {
        ifid?: string,
        pid?: number
        passageTitle?: string,
    }
}

interface IState {
    route: VueRouter.Route & IRoute,

    stories: IStory[],

    passagesSorting: ISorting,
    storiesSorting: ISorting,
    passagesFiltering: string,

    codeEditorOptions: IEditorOptions,

    storiesLoaded: boolean,

    proofModeError: boolean,
}

interface IFormatProperties {
    setup?: () => void;
    source: string,
}

interface IPublishOptions {
    formatOptions?: string[],
    startPassageId?: number,
}

interface ITextStats {
    words: number,
    characters: number,
    charactersAll: number,
}

interface IStoryStats extends ITextStats {
    passages: number,
    code: number,
}

interface IStoryItem {
    title: string,
    stats: IStoryStats,
    ifid: string,
    passages: IPassage[],
}

interface ISpecial {
    passages: string[],
    tags: string[]
}