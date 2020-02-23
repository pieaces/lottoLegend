const webpack = require('webpack');
const path = require('path');

const fileName = 'post';
const source = 'js';

module.exports = {
    mode: 'development',
    entry: `./front-end/src/${fileName}.${source}`,
    output: {
        filename: `${fileName}.js`,
        path: path.resolve(__dirname, 'front-end/js')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: './front-end',
        overlay: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: [".webpack.js", ".web.js", ".mjs", ".js", ".json", '.ts']
    }
};