"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Component {
  constructor(name) {
    this.name = name;
  }

  render() {
    console.log(this.name);
    return this.name;
  }

}

var _default = Component;
exports.default = _default;