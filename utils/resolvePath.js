"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolvePath;

var _path = _interopRequireDefault(require("path"));

const cwd = process.cwd();

function resolvePath(...paths) {
  return _path.default.resolve(cwd, ...paths);
}