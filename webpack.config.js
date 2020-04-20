const path = require('path');

// 확장자명 유의해서 쓸것! ts냐, js냐?
const file = 'board/read.ts'
////
const directory = file.slice(0, file.lastIndexOf('/'));
const name = file.slice(file.lastIndexOf('/') + 1, file.indexOf('.'));
let output = `${directory}/js`;
if (file.indexOf('components') !== -1) {
    output = `${directory}`;
} else if (file === 'main.ts' || file === 'admin.ts') output = '';
module.exports = {
    mode: 'production',
    entry: `./src/${file}`,
    devtool: 'cheap-eval-source-map',
    output: {
        filename: `${name}.js`,
        path: path.resolve(__dirname, output)
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".mjs", ".js", ".json", '.ts']
    }
};