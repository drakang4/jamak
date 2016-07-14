import webpack from 'webpack';
import baseConfig from './webpack.config.base';

export default {
  ...baseConfig,

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&reload=true',
    './src/index'
  ],

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:8080/built/'
  },

  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders
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
