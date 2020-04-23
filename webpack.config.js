const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        app: `./src/`,
    },
    devtool: 'cheap-eval-source-map',
    output: {
        filename: `${name}.js`,
        path: path.resolve(__dirname, 'dist')
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
        // Splitting Duplicated Chunk
        // 전체 응용 프로그램의 vendors 모든 코드를 포함 하는 청크
        // 즉, 자주 사용되어 중복으로 import 된 모듈을 별도의 chunk 파일로 생성하기 위한 설정이다.
        // 번들 파일을 적절히 분리함으로써 브라우저 캐시를 전략적으로 활용할 수 있어 초기 로딩속도를 최적화할 수 있다.
        splitChunks: {
            // cacheGroups : 명시적으로 특정 파일들을 청크로 분리할 때 사용
            cacheGroups: {
                vendors: {
                    // 대상이 되는 파일 지정(여기서는 node_modules 디렉터리에 있는 파일들이 대상)
                    test: /[\\/]node_modules[\\/]((?!suneditor).)*$/,
                    // 비동기 및 동기 모듈을 통한 최적화(test 조건에 포함되는 모든 것을 분리하겠다는 뜻)
                    chunks: 'initial',
                    // 청크로 분리할 때 이름으로 사용될 파일명
                    name: 'vendor'
                }
            }
        }
    },

    resolve: {
        extensions: [".webpack.js", ".web.js", ".mjs", ".js", ".json", '.ts']
    }
};