const path = require('path');
const entries = [
    {
        'account/agree': './src/account/agree.ts',
        'account/changePw': './src/account/changePw.ts',
        'account/findId': './src/account/findId.ts',
        'account/findPw': './src/account/findPw.ts',
        'account/join': './src/account/join.ts',
        'account/resultId': './src/account/resultId.ts',
        'account/signIn': './src/account/signIn.ts',
        'account/withdrawal': './src/account/withdrawal.ts',

        'base/configure': './src/base/configure.ts',

        'board/list': './src/board/list.ts',
        'board/post': './src/board/post.ts',
        'board/qnaList': './src/board/qnaList.ts',
        'board/read': './src/board/read.ts',

        'introduce/pay': './src/introduce/pay.ts',

        'myPage/currentPayment': './src/myPage/currentPayment.ts',
        'myPage/home': './src/myPage/home.ts',
        'myPage/includeExclude': './src/myPage/includeExclude.ts',
        'myPage/numbersList': './src/myPage/numbersList.ts',
        'myPage/payment': './src/myPage/payment.ts',

        'admin': './src/admin.ts',
        'main': './src/main.ts'
    },
    {
        'statistics/excludedLines': './src/statistics/excludedLines.ts',
        'statistics/pattern': './src/statistics/pattern.ts',
        'statistics/statistics': './src/statistics/statistics.ts',
        'statistics/units': './src/statistics/units.ts',
        'statistics/weekNumbers': './src/statistics/weekNumbers.ts',
        'statistics/winNumbers': './src/statistics/winNumbers.ts',

        'system/basic': './src/system/basic.ts',
        'system/experience': './src/system/experience.ts',
        'system/includeExclude': './src/system/includeExclude.ts',
        'system/premium': './src/system/premium.ts',
    }
];
const names = ['vendor/non-system', 'vendor/system'];

const INDEX = 0;
module.exports = {
    mode: 'production',
    entry: entries[INDEX],
    devtool: 'cheap-eval-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'js')
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]((?!suneditor|mobius1-selectr).)*$/,
                    chunks: 'initial',
                    name: names[INDEX]
                }
            }
        }
    },

    resolve: {
        extensions: [".webpack.js", ".web.js", ".mjs", ".js", ".json", '.ts']
    }
};