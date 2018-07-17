"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Plugin = _interopRequireDefault(require("./Plugin"));

var _prefix = _interopRequireDefault(require("./helper/prefix"));

var _BabelPresetResetPlugin = _interopRequireDefault(require("./BabelPresetResetPlugin"));

var _BabelPluginResetPlugin = _interopRequireDefault(require("./BabelPluginResetPlugin"));

/* eslint-disable class-methods-use-this */
class BabelLibPlugin extends _Plugin.default {
  constructor(modules = false) {
    super(`${_prefix.default}/babelLib`);
    this.modules = modules;
  }

  getDependencies() {
    return [new _BabelPresetResetPlugin.default('@babel/preset-env', {
      modules: this.modules,
      forceAllTransforms: true
    }), new _BabelPluginResetPlugin.default('@babel/plugin-transform-runtime', {
      polyfill: true
    })];
  }

  apply() {}

}
/* eslint-enable class-methods-use-this */


var _default = BabelLibPlugin;
exports.default = _default;