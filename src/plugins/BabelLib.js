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
        loose: false,
        modules: this.modules,
        useBuiltIns: false,
        forceAllTransforms: true,
      }),
      new BabelPluginReset('@babel/plugin-transform-runtime', {
        helpers: true,
        polyfill: true,
        regenerator: true,
        useBuiltIns: false,
        useESModules: this.modules === false,
      }),
    ];
  }

  apply() {}
}
/* eslint-enable class-methods-use-this */

export default BabelLib;
