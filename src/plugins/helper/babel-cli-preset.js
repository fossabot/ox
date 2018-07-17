const { default: guidKey } = require('./babel-cli-guid-key');

module.exports = () => {
  const { presets, plugins } = JSON.parse(process.env[guidKey]);
  return { presets, plugins };
};
