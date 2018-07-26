'use strict';

module.exports = {
    lintOnSave: true,

    configureWebpack: {
        entry: {
            app: './src/aife.js',
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
            },
        },
    },
    // configureWebpack(config) {
    //     console.log(JSON.stringify(config.module.rules, null, '  '));
    // },
};