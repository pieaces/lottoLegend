const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './front-end/js/lotto-func1.ts',
  output: {
    filename: 'lotto-func1.bundle.js',
    path: path.resolve(__dirname, 'dist')
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
    new CopyWebpackPlugin(['front-end/lotto-func1.html']),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};
