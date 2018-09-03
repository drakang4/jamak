module.exports = {
  entry: 'main/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
            options: {
              pedantic: true,
              sanitize: true,
            },
          },
        ],
      },
    ],
  },
};
