"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (baseConfig, {
  waitDependencies
}) => waitDependencies('app').then(appConfig => ({
  cacheDirectory: true,
  babelrc: false,
  presets: [['@babel/preset-env', {
    targets: appConfig.runtime,
    loose: false,
    modules: false,
    forceAllTransforms: false,
    useBuiltIns: 'usage'
  }]],
  plugins: [['@babel/plugin-transform-runtime', {
    polyfill: false
  }], ['@babel/plugin-proposal-decorators', {
    legacy: true
  }], ['@babel/plugin-proposal-class-properties', {
    loose: true
  }]]
}));

exports.default = _default;