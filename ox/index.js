"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("./config"));

var _hooks = _interopRequireDefault(require("./hooks"));

var _registPlugin = _interopRequireDefault(require("./registPlugin"));

class OX {
  constructor(buildInPlugins = []) {
    this.buildInPlugins = buildInPlugins;
    this.config = _config.default;
    this.hooks = _hooks.default;
  }

  async run() {
    const {
      config: {
        plugins = []
      }
    } = this;
    this.buildInPlugins.concat(plugins).forEach(plugin => (0, _registPlugin.default)(plugin, this)); // ConfigAssign: to get the config info

    this.hooks['config.assign'].intercept({
      register(tapInfo) {
        const {
          fn,
          ...others
        } = tapInfo;
        return { ...others,
          fn: function hooksConfigAssignModify(c, h) {
            return fn(c, h).then(d => d && Object.assign(c, d));
          }
        };
      }

    });
    await this.hooks['config.assign'].promise(this.config, this.hooks); // Ready: all config and hooks is ready,wait to run

    await this.hooks.ready.promise(this); // Run:Run the app

    await this.hooks.run.promise(this);
  }

}

var _default = OX;
exports.default = _default;