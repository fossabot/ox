"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SyncHook", {
  enumerable: true,
  get: function () {
    return _tapable.SyncHook;
  }
});
Object.defineProperty(exports, "SyncBailHook", {
  enumerable: true,
  get: function () {
    return _tapable.SyncBailHook;
  }
});
Object.defineProperty(exports, "SyncWaterfallHook", {
  enumerable: true,
  get: function () {
    return _tapable.SyncWaterfallHook;
  }
});
Object.defineProperty(exports, "SyncLoopHook", {
  enumerable: true,
  get: function () {
    return _tapable.SyncLoopHook;
  }
});
Object.defineProperty(exports, "AsyncSeriesHook", {
  enumerable: true,
  get: function () {
    return _tapable.AsyncSeriesHook;
  }
});
Object.defineProperty(exports, "AsyncSeriesBailHook", {
  enumerable: true,
  get: function () {
    return _tapable.AsyncSeriesBailHook;
  }
});
Object.defineProperty(exports, "AsyncSeriesWaterfallHook", {
  enumerable: true,
  get: function () {
    return _tapable.AsyncSeriesWaterfallHook;
  }
});
Object.defineProperty(exports, "AsyncParallelHook", {
  enumerable: true,
  get: function () {
    return _tapable.AsyncParallelHook;
  }
});
Object.defineProperty(exports, "AsyncParallelBailHook", {
  enumerable: true,
  get: function () {
    return _tapable.AsyncParallelBailHook;
  }
});
exports.default = void 0;

var _tapable = require("tapable");

var _default = _tapable.SyncHook;
exports.default = _default;