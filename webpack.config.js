const webpack = require('webpack');
const path = require('path');

// module.exports = {
//     mode: 'development',
//     entry: './front-end/functional/execute.ts',
//     output: {
//         filename: 'functional.js',
//         path: path.resolve(__dirname, 'front-end')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.ts$/,
//                 use: ['ts-loader'],
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     devServer: {
//         contentBase: './front-end',
//         overlay: true,
//         hot: true
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         new CopyWebpackPlugin(['./front-end/function.html']),

//     ],
//     resolve: {
//         extensions: ['.ts', '.js', '.json']
//     }
// };

module.exports = {
    mode: 'development',
    entry: './front-end/src/signIn.ts',
    output: {
        filename: 'signIn.js',
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

// module.exports = {
//     mode: 'development',
//     entry: './front-end/functional/statistics/execute.js',
//     output: {
//         filename: 'statistics.js',
//         path: path.resolve(__dirname, 'front-end')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.ts$/,
//                 use: ['ts-loader'],
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     devServer: {
//         contentBase: './front-end',
//         overlay: true,
//         hot: true
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         new CopyWebpackPlugin(['./front-end/statistics.html']),

//     ],
//     resolve: {
//         extensions: ['.ts', '.js', '.json']
//     }
// };