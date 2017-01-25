import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';

export default {
  devtool: 'cheap-eval-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'app'),
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/',
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'app'),
    hot: true,
    publicPath: 'http://localhost:8080/',
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
            loader: 'url-loader',
            options: {
              limit: 100000,
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
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
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
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'app/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  target: 'electron-renderer',
};
