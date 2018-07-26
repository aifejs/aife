'use strict';
/* eslint-env: node */
const eslintConfig = {
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        }
    },
    plugins: [
        'eslint-plugin-vue',
        'eslint-plugin-import',
    ],
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/warnings',
        'plugin:import/errors',
        'eslint-config-aifejs',
        'plugin:vue/recommended',
    ],
    rules: {
        semi: ['error', 'always'],
        'comma-dangle': ['error', {
            arrays: 'always',
            objects: 'always',
            imports: 'always',
            exports: 'always',
            functions: 'ignore',
        }],
        'no-console': ['warn'],
        'indent': ['error', 4],
        'no-debugger': [process.env.NODE_ENV === 'production' ? 'error' : 'warn'],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],

        'import/order': ['error', {
            'groups': ['builtin', 'external', 'internal', 'index', 'sibling', 'parent',],
            'newlines-between': 'always',

        }],
        'import/newline-after-import': ['error', { 'count': 1, },],
    },
};

module.exports = eslintConfig;
