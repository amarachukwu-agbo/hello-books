const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = webpackMerge(common, {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './client/src/index'
  ],
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
