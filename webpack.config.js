const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './front-end/functional/execute.ts',
    output: {
        filename: 'functional.js',
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
        contentBase: './dist',
        overlay: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
};