'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

const entry = `./src/${pkg.name}.js`;
const distFolder = 'dist';

const config = {
    entry,
    output: {
        path: path.resolve(__dirname, `./${distFolder}`),
        publicPath: `/${distFolder}/`,
        filename: `${pkg.name}.js`,
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },

    plugins: [
        new ExtractTextPlugin(`${pkg.name}.css`),
    ],

    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
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
        ],
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('css'),
            stylus: ExtractTextPlugin.extract('css!stylus'),
        },

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
            // make @import 'node_modules/smth/smth.css' work as expected
            (stylus) => {
                stylus
                    .include(__dirname)
                    .set('include css', true);
            },
        ],
    },
};

if (process.env.NODE_ENV === 'production') {
    config.devtool = '#source-map';
    config.plugins.push(...[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
    ]);
} else {
    config.devtool = '#eval-source-map';
    config.devServer ={
        historyApiFallback: true,
        noInfo: true,
    };
}

module.exports = config;