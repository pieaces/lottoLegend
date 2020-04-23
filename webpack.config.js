const path = require('path');

// 확장자명 유의해서 쓸것! ts냐, js냐?
const file = 'system/premium.ts'
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
    // optimization 로 중복된 모듈 없애기
    // optimization: {
    //     // Splitting Duplicated Chunk
    //     // 전체 응용 프로그램의 vendors 모든 코드를 포함 하는 청크
    //     // 즉, 자주 사용되어 중복으로 import 된 모듈을 별도의 chunk 파일로 생성하기 위한 설정이다.
    //     // 번들 파일을 적절히 분리함으로써 브라우저 캐시를 전략적으로 활용할 수 있어 초기 로딩속도를 최적화할 수 있다.
    //     splitChunks: {
    //         // cacheGroups : 명시적으로 특정 파일들을 청크로 분리할 때 사용
    //         cacheGroups: {
    //             vendors: {
    //                 // 대상이 되는 파일 지정(여기서는 node_modules 디렉터리에 있는 파일들이 대상)
    //                 test: /[\\/]node_modules[\\/]/,
    //                 // 비동기 및 동기 모듈을 통한 최적화(test 조건에 포함되는 모든 것을 분리하겠다는 뜻)
    //                 chunks: 'all',
    //                 // 청크로 분리할 때 이름으로 사용될 파일명
    //                 name: 'libras'
    //             }
    //         }
    //     }
    // },

    resolve: {
        extensions: [".webpack.js", ".web.js", ".mjs", ".js", ".json", '.ts']
    }
};