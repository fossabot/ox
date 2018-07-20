const { BabelPresetReset } = require('./plugins');
const ConsoleBabelConfig = require('./test-babel/plugins/ConsoleBabelConfig');

const oxEnv = process.env.OX_ENV;
module.exports = {
  dir: {
    config: oxEnv === 'test-babel' ? './test-babel/config' : './config',
  },
  plugins: [
    oxEnv === 'test-babel'
      ? new BabelPresetReset('@babel/preset-env', {
          modules: 'commonjs',
        })
      : null,
    oxEnv === 'test-babel' ? new ConsoleBabelConfig() : null,
  ],
};
