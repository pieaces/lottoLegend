const webpack = require('webpack');
const path = require('path');

// 확장자명 유의해서 쓸것! ts냐, js냐?
const file = 'account/join.ts'
////
const directory = file.slice(0, file.lastIndexOf('/'));
const name = file.slice(file.lastIndexOf('/') + 1, file.indexOf('.'));
module.exports = {
    mode: 'development',
    entry: ["@babel/polyfill", `./src/${file}`],
    // 웹팩 번들하고 나서 바벨 번들
    // 바벨 번들할 때 @babel/polyfill 
    output: {
        filename: `${name}.js`,
        path: path.resolve(__dirname, `${directory}/js`)
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