const { BabelLibPlugin } = require('./plugins');

const oxEnv = process.env.OX_ENV;
module.exports = {
  dir: {
    config: oxEnv === 'test-babel' ? './test-babel/config' : './config',
  },
  plugins: [oxEnv === 'test-babel' ? new BabelLibPlugin('commonjs') : null],
};
