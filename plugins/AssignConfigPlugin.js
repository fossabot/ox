"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _Plugin = _interopRequireDefault(require("./Plugin"));

var _prefix = _interopRequireDefault(require("./helper/prefix"));

var _keys = _interopRequireDefault(require("../utils/keys"));

var _resolvePath = _interopRequireDefault(require("../utils/resolvePath"));

var _mergeConfig = _interopRequireDefault(require("../utils/mergeConfig"));

var _hook = require("../hook");

const HasAssigned = {};
let idx = 0;

const getWaitDependencies = (config, hooks) => {
  const waitDependencies = dependencies => {
    if (typeof dependencies === 'string') {
      return waitDependencies([dependencies]).then(c => c[0]); // eslint-disable-line
    }

    return Promise.all(dependencies.map(key => {
      if (HasAssigned[key]) {
        return config[key];
      }

      idx += 1;
      return new Promise(resolve => {
        hooks[`config.assign.${key}.done`].tapPromise(`waitDependenciesDone-${idx}`, c => {
          resolve(c[key]);
          return Promise.resolve();
        });
      });
    }));
  };

  return waitDependencies;
};

const getConfig = (baseConfig, filePath, {
  config,
  hooks,
  waitDependencies
}) => {
  if (_fsExtra.default.existsSync(filePath)) {
    try {
      /* eslint-disable global-require,import/no-dynamic-require */
      const fn = require(filePath);
      /* eslint-enable global-require,import/no-dynamic-require */


      if (typeof fn === 'function') {
        return fn(baseConfig, {
          config,
          hooks,
          waitDependencies
        });
      }

      if (typeof fn.default === 'function') {
        return fn.default(baseConfig, {
          config,
          hooks,
          waitDependencies
        });
      }

      return fn;
    } catch (e) {
      console.log(_chalk.default.yellow(`[OX]AssignConfigPlugin:error happened in '${_path.default}'`));
      console.log(_chalk.default.red(e.message));
      console.log(e);
      process.exit(1);
    }
  }

  return {};
};

const defaultBuildInConfigDir = _path.default.resolve(__dirname, '../config');

class AssignConfigPlugin extends _Plugin.default {
  constructor(key, buildInConfigDir = defaultBuildInConfigDir) {
    super(`${_prefix.default}/assignConfig/${key}`);
    this.key = key;
    this.buildInConfigDir = buildInConfigDir;
  }

  getHooks() {
    return {
      [`config.assign.${this.key}.userConfig.before`]: new _hook.AsyncSeriesWaterfallHook(['buildInConfig', 'others']),
      [`config.assign.${this.key}.userConfig.done`]: new _hook.AsyncSeriesWaterfallHook(['userConfig', 'others']),
      [`config.assign.${this.key}.merged`]: new _hook.AsyncSeriesWaterfallHook(['mergedConfig', 'others']),
      [`config.assign.${this.key}.done`]: new _hook.AsyncParallelHook(['config', 'hooks'])
    };
  }

  apply(ox) {
    ox.hooks['config.assign'].tapPromise(this.name, async (config, hooks) => {
      const waitDependencies = getWaitDependencies(config, hooks);
      let buildInConfig = await getConfig({}, _path.default.resolve(this.buildInConfigDir, `./${this.key}.config.js`), {
        config,
        hooks,
        waitDependencies
      });
      buildInConfig = await hooks[`config.assign.${this.key}.userConfig.before`].promise(buildInConfig, {
        config,
        hooks
      });
      const {
        [_keys.default['rc-config']]: {
          dir: {
            config: configDir
          }
        }
      } = config;
      let userConfig = await getConfig(buildInConfig, (0, _resolvePath.default)(configDir, `./${this.key}.config.js`), {
        config,
        hooks,
        waitDependencies
      });
      userConfig = await hooks[`config.assign.${this.key}.userConfig.done`].promise(userConfig, {
        buildInConfig,
        config,
        hooks
      });
      let mergedConfig = (0, _mergeConfig.default)(buildInConfig, userConfig);
      mergedConfig = await hooks[`config.assign.${this.key}.merged`].promise(mergedConfig, {
        userConfig,
        buildInConfig,
        config,
        hooks
      });
      Object.assign(config, {
        [this.key]: mergedConfig
      });
      HasAssigned[this.key] = true;
      await hooks[`config.assign.${this.key}.done`].promise(config, hooks);
    });
  }

}

var _default = AssignConfigPlugin;
exports.default = _default;