const path = require('path');
const cleanWebPackPlugin = require('clean-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new cleanWebPackPlugin(['dist']),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(png|svg|gif|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
    ],
  },
};
