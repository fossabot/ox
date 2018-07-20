import Plugin from './Plugin';
import prefix from './helper/prefix';
import BabelPresetReset from './BabelPresetReset';
import BabelPluginReset from './BabelPluginReset';

/* eslint-disable class-methods-use-this */
class BabelLib extends Plugin {
  constructor(modules = false) {
    super(`${prefix}/babelLib`);
    this.modules = modules;
  }

  getDependencies() {
    return [
      new BabelPresetReset('@babel/preset-env', {
        modules: this.modules,
        forceAllTransforms: true,
      }),
      new BabelPluginReset('@babel/plugin-transform-runtime', {
        polyfill: true,
      }),
    ];
  }

  apply() {}
}
/* eslint-enable class-methods-use-this */

export default BabelLib;
