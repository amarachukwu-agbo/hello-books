const path = require('path');
const cleanWebPackPlugin = require('clean-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new cleanWebPackPlugin(['dist']),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        //include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: {
          loader: 'style-loader!css-loader!sass-loader',
        },
        //include: path.join(__dirname, 'client'),
      },
      {
        test: /\.(png|svg|gif|jpg)$/,
        use: {
          loader: 'file-loader',
          //include: path.join(__dirname, 'client'),
        },
      },
    ],
  },
};