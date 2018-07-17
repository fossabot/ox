"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _chalk = _interopRequireDefault(require("chalk"));

var _keys = _interopRequireDefault(require("../utils/keys"));

var _config = _interopRequireDefault(require("./config.default"));

var _resolvePath = _interopRequireDefault(require("../utils/resolvePath"));

var _mergeConfig = _interopRequireDefault(require("../utils/mergeConfig"));

/* eslint-disable import/no-mutable-exports */
const config = {
  [_keys.default['rc-config']]: _config.default,
  plugins: _config.default.plugins
};
/* eslint-enable import/no-mutable-exports */

const rcPath = (0, _resolvePath.default)('./.oxrc.js');

if (_fsExtra.default.existsSync(rcPath)) {
  try {
    const rcConfig = require(rcPath); // eslint-disable-line


    config[_keys.default['rc-config']] = (0, _mergeConfig.default)(_config.default, rcConfig);
    const {
      plugins = []
    } = rcConfig;
    config.plugins = _config.default.plugins.concat(plugins);
  } catch (e) {
    console.log(_chalk.default.red(`[OX]oxrc:${e.message}`));
    console.log(e);
    process.exit(0);
  }
}

var _default = config;
exports.default = _default;