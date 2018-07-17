"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crossSpawn = _interopRequireDefault(require("cross-spawn"));

var _chalk = _interopRequireDefault(require("chalk"));

var _Plugin = _interopRequireDefault(require("../Plugin"));

var _prefix = _interopRequireDefault(require("../helper/prefix"));

var _babelCliGuidKey = _interopRequireDefault(require("../helper/babel-cli-guid-key"));

/* eslint-disable class-methods-use-this */
class BabelCliPlugin extends _Plugin.default {
  constructor() {
    super(`${_prefix.default}/buildIns/babelCli`);
  }

  apply(ox) {
    ox.hooks.run.tapPromise(this.name, ({
      config
    }) => this.babel(config));
  }

  async babel(config) {
    const {
      babel: babelConfig
    } = config;
    process.env[_babelCliGuidKey.default] = JSON.stringify(babelConfig);
    await this.spawn();
  }

  async spawn() {
    const args = process.argv.slice(2);
    const srcDir = args[0] || './src';
    const outerDir = args[1] || './lib';
    const buildFiles = (0, _crossSpawn.default)( // 'cross-env',
    `babel ${srcDir} --out-dir ${outerDir} --no-babelrc --presets module:${require.resolve('../helper/babel-cli-preset')} --copy-files`, [], {
      stdio: [process.stdin, process.stdout, process.stderr]
    });
    await new Promise(resolve => buildFiles.on('close', code => {
      if (code === 0) {
        console.log(_chalk.default.green(`build lib files from '${srcDir}' to '${outerDir}' success`));
        resolve();
      }
    }));
  }

}
/* eslint-enable class-methods-use-this */


var _default = BabelCliPlugin;
exports.default = _default;