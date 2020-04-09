const path = require('path');

// 확장자명 유의해서 쓸것! ts냐, js냐?
<<<<<<< HEAD
const file = 'account/signIn.ts'
=======
const file = 'base/components/footer.js'
>>>>>>> e85af138f95180c558cc398ddd8b1fac800a5772
////
const directory = file.slice(0, file.lastIndexOf('/'));
const name = file.slice(file.lastIndexOf('/') + 1, file.indexOf('.'));
let output = `${directory}/js`;
if (file.indexOf('components') !== -1) {
    output = `${directory}`;
} else if (file === 'main.ts') output = '';
module.exports = {
    mode: 'development',
    entry: [`./src/${file}`],
    devtool: 'cheap-eval-source-map',
    output: {
        filename: `${name}.js`,
        path: path.resolve(__dirname, output)
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
    resolve: {
        extensions: [".webpack.js", ".web.js", ".mjs", ".js", ".json", '.ts']
    }
};