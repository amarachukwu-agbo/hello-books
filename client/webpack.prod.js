const uglifgyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
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
    new webpack.DefinePlugin({
      'process.env': {
        CLOUDINARY_URL: JSON.stringify(process.env.CLOUDINARY_URL),
        UPLOAD_PRESET: JSON.stringify(process.env.UPLOAD_PRESET),
      },
    }),
    new uglifgyJSPlugin({
      sourceMap: true,
    }),
  ],
});
