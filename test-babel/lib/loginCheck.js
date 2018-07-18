"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var logined = false;

var _default = fn => {
  if (logined) {
    return fn();
  }

  return 'not login';
};

exports.default = _default;