const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: resolve(__dirname, 'app/renderer'),

  output: {
    filename: 'bundle.js',
    sourceMapFilename: '[name].map',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          resolve(__dirname, 'app/renderer'),
        ],
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [
          resolve(__dirname, 'app/renderer'),
          /node_modules/,
        ],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              constLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'file-loader',
        ],
      },
    ],
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
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, 'app/index.html'),
    }),
    new ExtractTextPlugin('styles.css'),
  ],

  target: 'electron-renderer',
};
