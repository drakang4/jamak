import webpack from 'webpack';
import path from 'path';
import htmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './webpack.config.base';

export default {
  ...baseConfig,

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },

  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,
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
      },
      {
        test: /\.woff$/,
        loaders: ['url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: false
    })
  ],

  target: 'electron-renderer'
};
