"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Plugin = _interopRequireDefault(require("./Plugin"));

var _prefix = _interopRequireDefault(require("./helper/prefix"));

var _babelPresetReset = _interopRequireDefault(require("./helper/babel-preset-reset"));

let idx = 0;

class BabelPresetResetPlugin extends _Plugin.default {
  constructor(name, options = {}) {
    super(`${_prefix.default}/babelPresetReset/${idx += 1}`);
    this.presetName = name;
    this.options = options;
  }

  apply(ox) {
    ox.hooks['config.assign.babel.merged'].tapPromise(this.name, mergedConfig => {
      (0, _babelPresetReset.default)(mergedConfig, this.presetName, this.options);
      return Promise.resolve(mergedConfig);
    });
  }

}

var _default = BabelPresetResetPlugin;
exports.default = _default;