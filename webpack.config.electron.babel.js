import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'source-map',

  entry: path.resolve(__dirname, 'app/main.js'),

  output: {
    path: __dirname,
    filename: path.resolve(__dirname, 'app/main.js'),
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    // new webpack.BannerPlugin(
    //   'require("source-map-support").install();',
    //   { raw: true, entryOnly: false }
    // ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  target: 'electron-main',

  node: {
    __filename: false,
    __dirname: false,
  },
};
