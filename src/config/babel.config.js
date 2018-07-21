export default (baseConfig, { waitDependencies }) =>
  waitDependencies('app').then(appConfig => ({
    cacheDirectory: true,
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: appConfig.runtime,
          loose: false,
          modules: 'commonjs',
          useBuiltIns: false,
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: true,
          polyfill: true,
          regenerator: true,
          useBuiltIns: false,
          useESModules: false,
        },
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
  }));
