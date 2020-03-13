const webpack = require('webpack');
const path = require('path');

// 확장자명 유의해서 쓸것! ts냐, js냐?
const file = 'board/list.ts'
////
const directory = file.slice(0, file.lastIndexOf('/'));
const name = file.slice(file.lastIndexOf('/')+1, file.indexOf('.'));
module.exports = {
    mode: 'development',
    entry: `./front-end/src/${file}`,
    output: {
        filename: `${name}.js`,
        path: path.resolve(__dirname, `front-end/html/${directory}/js`)
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