module.exports = {
  packagerConfig: {
    asar: true,
    ignore: ['/sample-media/'],
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
    },
    {
      name: '@electron-forge/maker-squirrel',
    },
    {
      name: '@electron-forge/maker-dmg',
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
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'drakang4',
          name: 'jamak',
        },
        prerelease: process.env.IS_BETA ? true : false,
      },
    },
  ],
  buildIdentifier: process.env.IS_BETA ? 'beta' : 'prod',
};
