const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common');

module.exports = webpackMerge(common, {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/src/index',
  ],
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve('./.env'),
    }),
  ],
});
