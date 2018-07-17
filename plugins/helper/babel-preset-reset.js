"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (config, name, options) => {
  const {
    presets
  } = config;
  let targetPreset = null;
  let targetIdx = 0;
  let targetOptions = {};

  for (let i = 0, len = presets.length; i < len; i += 1) {
    const preset = presets[i];

    if (Array.isArray(preset)) {
      if (preset[0] === name) {
        targetPreset = preset;
        targetIdx = i;
        targetOptions = preset[1]; // eslint-disable-line

        break;
      }
    }

    if (preset === name) {
      targetPreset = preset;
      targetIdx = i;
      targetOptions = {};
      break;
    }
  }

  if (targetPreset) {
    presets[targetIdx] = [name, { ...targetOptions,
      ...options
    }];
  } else {
    presets.splice(0, 0, [name, { ...targetOptions,
      ...options
    }]);
  }
};

exports.default = _default;