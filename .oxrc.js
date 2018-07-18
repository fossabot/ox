const { BabelPresetResetPlugin } = require('./plugins');
const ConsoleBabelConfigPlugin = require('./test-babel/plugins/ConsoleBabelConfigPlugin');

const oxEnv = process.env.OX_ENV;
module.exports = {
  dir: {
    config: oxEnv === 'test-babel' ? './test-babel/config' : './config',
  },
  plugins: [
    oxEnv === 'test-babel'
      ? new BabelPresetResetPlugin('@babel/preset-env', {
          modules: 'commonjs',
        })
      : null,
    oxEnv === 'test-babel' ? new ConsoleBabelConfigPlugin() : null,
  ],
};
