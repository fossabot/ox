"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _Plugin = _interopRequireDefault(require("../Plugin"));

var _prefix = _interopRequireDefault(require("../helper/prefix"));

var _keys = _interopRequireDefault(require("../../utils/keys"));

var _resolvePath = _interopRequireDefault(require("../../utils/resolvePath"));

var _AssignConfigPlugin = _interopRequireDefault(require("../AssignConfigPlugin"));

const getConfigKeys = dir => {
  const configKeys = [];

  const files = _fsExtra.default.readdirSync(dir);

  files.forEach(file => {
    const stat = _fsExtra.default.statSync(_path.default.resolve(dir, file));

    if (stat.isFile()) {
      const match = file.match(/^(.+?)\.config\.js$/);

      if (match) {
        configKeys.push(match[1]);
      }
    }
  });
  return configKeys;
};
/* eslint-disable class-methods-use-this */


class AutoAssignConfigPlugin extends _Plugin.default {
  constructor() {
    super(`${_prefix.default}/buildIns/autoAssignConfig`);
  }

  getDependencies(config) {
    const {
      [_keys.default['rc-config']]: {
        dir: {
          config: configDir
        }
      }
    } = config;
    return getConfigKeys(_path.default.resolve(__dirname, '../../config')).concat(getConfigKeys((0, _resolvePath.default)(configDir))).map(key => new _AssignConfigPlugin.default(key));
  }

  apply() {}

}
/* eslint-enable class-methods-use-this */


var _default = AutoAssignConfigPlugin;
exports.default = _default;