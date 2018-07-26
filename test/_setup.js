'use strict';

const hooks = require('require-extension-hooks');


// Setup `.vue` files to be processed by `require-extension-hooks-vue`.
hooks('vue').plugin('vue').push();
// Setup `.vue` and `.js` files to be processed by `require-extension-hooks-babel`.
hooks(['vue', 'js',]).plugin('babel', {plugins: ['transform-object-rest-spread',],}).push();