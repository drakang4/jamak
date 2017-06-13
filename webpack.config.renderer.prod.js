const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

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
          /\.svg$/,
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
        ],
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        include: [
          /node_modules/,
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
      {
        test: /\.svg$/,
        include: [
          resolve(__dirname, 'app/renderer'),
        ],
        exclude: /node_modules/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new BabiliPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, 'app/index.html'),
    }),
    new ExtractTextPlugin('styles.css'),
  ],

  target: 'electron-renderer',
};
