const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  devtool: 'source-map',

  entry: resolve(__dirname, 'app/main'),

  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],

  target: 'electron-main',

  node: {
    __filename: false,
    __dirname: false,
  },
};
