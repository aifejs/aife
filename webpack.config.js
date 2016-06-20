'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

const entry = `./src/${pkg.name}.js`;

const config = {
    entry,
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
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
                test: /\.css/,
                loader: 'css',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
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
            browsers: ['last 2 Chrome versions', 'last 2 Firefox versions', 'ChromeAndroid > 50', 'Edge >= 14',],
        },
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