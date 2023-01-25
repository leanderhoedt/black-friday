const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const express = require('express');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        onBeforeSetupMiddleware: (devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            devServer.app.use(express.json());
            devServer.app.post('/api/newsletter', function (req, res) {
                if (req.body && req.body.emailAddress) {
                    if (req.body.emailAddress === 'existinguser@nayan.be') {
                        res.json({ success: false, errorMessage: 'EXISTING_USER' });
                        return;
                    }

                    res.json({ success: true });
                    return;
                }

                res.status(400);
                res.json({ success: false });
            });
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Job Interview Template | Front-end / Vue.js',
            template: './src/index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};
