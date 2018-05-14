const uglifgyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = webpackMerge(common, {
  entry: {
    app: './client/src/index.js',
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new uglifgyJSPlugin({
      sourceMap: true,
    }),
  ],
});
