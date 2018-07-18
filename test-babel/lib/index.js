"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("core-js/modules/es6.map");

require("core-js/modules/es6.promise");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.set");

require("regenerator-runtime/runtime");

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _Component = _interopRequireDefault(require("./Component"));

var _loginCheck = _interopRequireDefault(require("./loginCheck"));

var _class, _class2;

/* eslint-disable class-methods-use-this */
var PageIndex = (0, _loginCheck.default)(_class = (_class2 = class PageIndex extends _Component.default {
  constructor() {
    super('PageIndex');
    this.refreshData =
    /*#__PURE__*/
    _regenerator.default.mark(function refreshData() {
      return _regenerator.default.wrap(function refreshData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Date.now();

            case 2:
              return _context.abrupt("return", new Set());

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, refreshData, this);
    });
    this.loadData =
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return new Promise(resolve => setTimeout(() => resolve(), 3000));

            case 2:
              return _context2.abrupt("return", new Map());

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this);
    }));
  }

  componentDidMount() {
    this.loadData();
  }

  getProps(a, _ref2, _ref3, props) {
    var _ref2$b = _ref2.b,
        b = _ref2$b === void 0 ? 1 : _ref2$b,
        c = _ref2.c;
    var _ref3$d = _ref3.d,
        d = _ref3$d === void 0 ? 2 : _ref3$d,
        others = (0, _objectWithoutProperties2.default)(_ref3, ["d"]);
    console.log((0, _objectSpread2.default)({}, others, props, {
      a,
      b,
      c: {
        c,
        d
      }
    }));
  }

  render() {
    return 'page index';
  }

}, ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "render", [_loginCheck.default], Object.getOwnPropertyDescriptor(_class2.prototype, "render"), _class2.prototype)), _class2)) || _class;
/* eslint-enable class-methods-use-this */


var _default = PageIndex;
exports.default = _default;