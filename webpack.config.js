'use strict';

const path = require('path');
const {DefinePlugin, optimize: {UglifyJsPlugin, OccurenceOrderPlugin,}, NoErrorsPlugin,} = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

const entry = `./src/${pkg.name}.js`;
const distFolder = 'dist';

const isProduction = process.env.NODE_ENV === 'production';

// generate loader string to be used with extract text plugin
function generateLoaders(loaders, sourceMap, extract) {
    const sourceLoader = loaders.map((loader) => {
        let extraParamChar;
        if (/\?/.test(loader)) {
            loader = loader.replace(/\?/, '-loader?');
            extraParamChar = '&';
        } else {
            loader = `${loader}-loader`;
            extraParamChar = '?';
        }
        return loader + (sourceMap ? `${extraParamChar}sourceMap` : '');
    }).join('!');

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (extract) {
        return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
    } else {
        return ['vue-style-loader', sourceLoader,].join('!');
    }
}

function cssLoaders(options = {}) {
    // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    return {
        css: generateLoaders(['css',]),
        postcss: generateLoaders(['css',]),
        stylus: generateLoaders(['css', 'stylus',]),
        styl: generateLoaders(['css', 'stylus',]),
    };
}

function styleLoaders(options) {
    const output = [];
    const loaders = cssLoaders(options);
    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp(`\\.${extension}$`),
            loader,
        });
    }
    return output;
}

const config = {
    entry,
    output: {
        path: path.resolve(__dirname, `./${distFolder}`),
        publicPath: `/${distFolder}/`,
        filename: `${pkg.name}.js`,
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },

    plugins: [
        new ExtractTextPlugin(`${pkg.name}.css`),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: isProduction ? '"production"' : '"development"',
            },
        }),
    ],

    module: {
        preLoaders: [
            {
                test: /\.vue|js$/,
                loader: 'eslint',
                include: [
                    path.join(__dirname, 'src'),
                ],
                exclude: /node_modules/,
            },
        ],

        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: /node_modules(?:\\|\/)sugarcube-mode/,
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.html$/,
                loader: 'vue-html',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                },
            },
            ...styleLoaders({
                sourceMap: true,
                extract: isProduction,
            }),
        ],
    },

    eslint: {
        formatter: require('eslint-friendly-formatter'),
    },

    vue: {
        loaders: cssLoaders({
            sourceMap: true,
            extract: isProduction,
        }),

        autoprefixer: {
            browsers: [
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'ChromeAndroid > 50',
                'Edge >= 13',
                'iOS >=8',
            ],
            flexbox: 'no-2009',
        },
    },

    stylus: {
        use: [
            // make @import css actually include them
            (stylus) => {
                stylus
                    .set('include css', true);
            },
        ],
    },
};

if (isProduction) {
    config.devtool = '#source-map';
    config.plugins.push(...[
        new UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new OccurenceOrderPlugin(),
    ]);
} else {
    config.devtool = '#eval-source-map'; // nice stacktraces

    let devServerConfig = {
        noInfo: true,
        inline: true,
        colors: true,
        historyApiFallback: true,
    };
    try {
        // create devserver.config.js file to locally override webpack devserver settings
        devServerConfig = Object.assign(
            devServerConfig,
            require('./devserver.config')
        );
        console.log('Custom devserver config loaded.');
    } catch (e) {
        if (!e.message.startsWith('Cannot find module')) {
            console.error('Error loading custom config: ', e);
        }
    }

    config.devServer = devServerConfig;

    config.plugins.push(...[
        new NoErrorsPlugin(),
    ]);
}

module.exports = config;