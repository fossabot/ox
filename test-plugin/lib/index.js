"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _plugins = require("../../plugins");

class TestPlugin extends _plugins.Plugin {
  constructor() {
    super('@ox/test-plugin/test');
  }

  apply(ox) {
    ox.hooks['config.assign'].tapPromise(this.name, () => new Promise(resolve => {
      _fsExtra.default.readFile(_path.default.resolve(__dirname, '../../.babelrc'), (err, buff) => {
        if (!err) {
          resolve({
            babel: JSON.parse(buff.toString())
          });
          return;
        }

        console.log(_chalk.default.red(`[OX]PluginBuildOXPlugin:${err.message || err}`));
        console.log(err);
        process.exit(0);
      });
    }));
  }

}

var _default = TestPlugin;
exports.default = _default;