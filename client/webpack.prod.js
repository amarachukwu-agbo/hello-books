const uglifgyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = webpackMerge(common, {
  entry: {
    app: './client/src/index.js',
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new uglifgyJSPlugin({
      sourceMap: true,
    }),
  ],
});
