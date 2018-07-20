const { Plugin } = require('../../plugins');

class ConsoleBabelConfig extends Plugin {
  constructor() {
    super('@ox/test-babel/consoleBabelConfig');
  }

  apply(ox) {
    ox.hooks['config.assign.babel.done'].tapPromise(this.name, config => {
      console.log({ babel: JSON.stringify(config.babel) });
      return Promise.resolve();
    });
  }
}

module.exports = ConsoleBabelConfig;
