"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hook = require("../hook");

var _default = {
  'config.assign': new _hook.AsyncParallelHook(['config', 'hooks']),
  ready: new _hook.AsyncParallelHook(['ox']),
  run: new _hook.AsyncSeriesHook(['ox'])
};
exports.default = _default;