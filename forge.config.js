module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'jamak',
      },
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './app/index.html',
              js: './app/index.tsx',
              name: 'app',
            },
          ],
        },
      },
    ],
  ],
  buildIdentifier: process.env.IS_BETA ? 'beta' : 'prod',
};
