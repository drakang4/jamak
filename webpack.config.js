var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var path = require('path');

var config = {
  entry: {
    app: ['webpack/hot/dev-server', './src/index']
  },
  output: {
    path: path.join(__dirname, 'built'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test   : /\.css$/,
        loaders: ['style', 'css', 'resolve-url'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap'],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loaders: ['svg-url'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
