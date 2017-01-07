import webpack from 'webpack';
import path from 'path';
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
    publicPath: '/',
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'app'),
    hot: true,
    inline: true,
    publicPath: 'http://localhost:8080/',
    watchContentBase: true,
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  target: 'electron-renderer',
};
