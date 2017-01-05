import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'cheap-module-source-map',

  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    publicpath: '/assets/',
  },

  resolveLoader: {
    moduleExtensions: ['-loader'],
  },

  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.jsx?$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
        ],
        use: [
          {
            loader: 'url',
            options: {
              limit: 10000,
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          { loader: 'babel' },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style' },
          { loader: 'css' },
          { loader: 'sass' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style' },
          { loader: 'css' },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          { loader: 'file' },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'app/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],

  target: 'electron',
};
