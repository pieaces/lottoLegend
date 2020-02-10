const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './front-end/functional/execute.ts',
    output: {
        filename: 'functional.js',
        path: path.resolve(__dirname, 'front-end')
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
        new CopyWebpackPlugin(['./front-end/function.html']),

    ],
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
};