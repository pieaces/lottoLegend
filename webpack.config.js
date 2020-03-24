const webpack = require('webpack');
const path = require('path');

// 확장자명 유의해서 쓸것! ts냐, js냐?
const file = 'statistics/statistics.ts'
////
const directory = file.slice(0, file.lastIndexOf('/'));
const name = file.slice(file.lastIndexOf('/') + 1, file.indexOf('.'));
module.exports = {
    mode: 'development',
    entry: ["@babel/polyfill", `./base/js/headerHover.js`],
    output: {
        filename: `headerHover.js`,
        path: path.resolve(__dirname, `base/js`)
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                use: 'babel-loader',
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