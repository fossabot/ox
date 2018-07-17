"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (config, name, options) => {
  const {
    plugins
  } = config;
  let targetPlugin = null;
  let targetIdx = 0;
  let targetOptions = {};

  for (let i = 0, len = plugins.length; i < len; i += 1) {
    const plugin = plugins[i];

    if (Array.isArray(plugin)) {
      if (plugin[0] === name) {
        targetPlugin = plugin;
        targetIdx = i;
        targetOptions = plugin[1]; // eslint-disable-line

        break;
      }
    }

    if (plugin === name) {
      targetPlugin = plugin;
      targetIdx = i;
      targetOptions = {};
      break;
    }
  }

  if (targetPlugin) {
    plugins[targetIdx] = [name, { ...targetOptions,
      ...options
    }];
  } else {
    plugins.splice(0, 0, [name, { ...targetOptions,
      ...options
    }]);
  }
};

exports.default = _default;