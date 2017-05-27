const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    resolve(__dirname, 'app/renderer'),
  ],

  output: {
    filename: 'bundle.js',
    sourceMapFilename: '[file].map',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    contentBase: resolve(__dirname, 'app'),
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
              importLoaders: 1,
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
      NODE_ENV: 'development',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, 'app/index.html'),
    }),
    new ExtractTextPlugin('styles.css'),
  ],

  target: 'electron-renderer',
};
