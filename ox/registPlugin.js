"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registPlugin;

var _chalk = _interopRequireDefault(require("chalk"));

const registedPlugins = {};

function registPlugin(plugin, ox) {
  if (plugin) {
    if (typeof plugin.name !== 'string' || plugin.name.trim() === '') {
      console.log(_chalk.default.red('Plugin must has a valid name'));
      process.exit(0);
    }

    if (typeof plugin.apply !== 'function') {
      console.log(_chalk.default.red(`Plugin '${_chalk.default.green(plugin.name)}' must has a '${_chalk.default.yellow('apply')}' named function`));
      process.exit(0);
    }

    if (!registedPlugins[plugin.name]) {
      registedPlugins[plugin.name] = true;

      try {
        const dependencies = plugin.getDependencies(ox.config);
        dependencies.forEach(p => registPlugin(p, ox));
        const hooks = plugin.getHooks();
        Object.assign(ox.hooks, hooks);
        plugin.apply(ox);
      } catch (e) {} // eslint-disable-line

    }
  }
}