import Plugin from './Plugin';
import prefix from './helper/prefix';
import BabelPresetResetPlugin from './BabelPresetResetPlugin';
import BabelPluginResetPlugin from './BabelPluginResetPlugin';

/* eslint-disable class-methods-use-this */
class BabelLibPlugin extends Plugin {
  constructor(modules = false) {
    super(`${prefix}/babelLib`);
    this.modules = modules;
  }

  getDependencies() {
    return [
      new BabelPresetResetPlugin('@babel/preset-env', {
        modules: this.modules,
        forceAllTransforms: true,
      }),
      new BabelPluginResetPlugin('@babel/plugin-transform-runtime', {
        polyfill: true,
      }),
    ];
  }

  apply() {}
}
/* eslint-enable class-methods-use-this */

export default BabelLibPlugin;
