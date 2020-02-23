const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: `./front-end/src/post.js`,
    output: {
        filename: `post.js`,
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