'use strict';

module.exports = {
    stylus: {
        'include css': true,
        'resolve url': true,
    },

    autoprefixer: {
        browsers: ['last 2 Chrome versions', 'last 2 Firefox versions', 'ChromeAndroid > 50', 'Edge >= 14',],
    },
};