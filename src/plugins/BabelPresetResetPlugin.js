import Plugin from './Plugin';
import prefix from './helper/prefix';
import babelPresetReset from './helper/babel-preset-reset';

let idx = 0;
class BabelPresetResetPlugin extends Plugin {
  constructor(name, options = {}) {
    super(`${prefix}/babelPresetReset/${(idx += 1)}`);
    this.presetName = name;
    this.options = options;
  }

  apply(ox) {
    ox.hooks['config.assign.babel.merged'].tapPromise(this.name, mergedConfig => {
      babelPresetReset(mergedConfig, this.presetName, this.options);
      return Promise.resolve(mergedConfig);
    });
  }
}

export default BabelPresetResetPlugin;
