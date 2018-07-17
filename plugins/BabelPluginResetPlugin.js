"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Plugin = _interopRequireDefault(require("./Plugin"));

var _prefix = _interopRequireDefault(require("./helper/prefix"));

var _babelPluginReset = _interopRequireDefault(require("./helper/babel-plugin-reset"));

let idx = 0;

class BabelPluginResetPlugin extends _Plugin.default {
  constructor(name, options = {}) {
    super(`${_prefix.default}/babelPluginReset/${idx += 1}`);
    this.pluginName = name;
    this.options = options;
  }

  apply(ox) {
    ox.hooks['config.assign.babel.merged'].tapPromise(this.name, mergedConfig => {
      (0, _babelPluginReset.default)(mergedConfig, this.pluginName, this.options);
      return Promise.resolve(mergedConfig);
    });
  }

}

var _default = BabelPluginResetPlugin;
exports.default = _default;