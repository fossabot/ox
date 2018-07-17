import Plugin from './Plugin';
import prefix from './helper/prefix';
import babelPluginReset from './helper/babel-plugin-reset';

let idx = 0;
class BabelPluginResetPlugin extends Plugin {
  constructor(name, options = {}) {
    super(`${prefix}/babelPluginReset/${(idx += 1)}`);
    this.pluginName = name;
    this.options = options;
  }

  apply(ox) {
    ox.hooks['config.assign.babel.merged'].tapPromise(this.name, mergedConfig => {
      babelPluginReset(mergedConfig, this.pluginName, this.options);
      return Promise.resolve(mergedConfig);
    });
  }
}

export default BabelPluginResetPlugin;
