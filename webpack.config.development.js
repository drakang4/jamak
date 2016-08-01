import webpack from 'webpack';
import baseConfig from './webpack.config.base';

export default {
  ...baseConfig,

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
    './src/index.js'
  ],

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:8080/built/'
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
        loaders: ['file', 'url'],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],

  target: 'electron-renderer'
};
