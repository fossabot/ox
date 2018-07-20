import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import Plugin from './Plugin';
import prefix from './helper/prefix';
import keys from '../utils/keys';
import resolvePath from '../utils/resolvePath';
import mergeConfig from '../utils/mergeConfig';
import { AsyncSeriesWaterfallHook, AsyncParallelHook } from '../hook';

const HasAssigned = {};

let idx = 0;
const getWaitDependencies = (config, hooks) => {
  const waitDependencies = dependencies => {
    if (typeof dependencies === 'string') {
      return waitDependencies([dependencies]).then(c => c[0]); // eslint-disable-line
    }
    return Promise.all(
      dependencies.map(key => {
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
      }),
    );
  };
  return waitDependencies;
};

export const getConfig = (baseConfig, filePath, { config, hooks, waitDependencies }) => {
  if (fs.existsSync(filePath)) {
    try {
      /* eslint-disable global-require,import/no-dynamic-require */
      const fn = require(filePath);
      /* eslint-enable global-require,import/no-dynamic-require */
      if (typeof fn === 'function') {
        return fn(baseConfig, { config, hooks, waitDependencies });
      }
      if (typeof fn.default === 'function') {
        return fn.default(baseConfig, { config, hooks, waitDependencies });
      }
      return fn;
    } catch (e) {
      console.log(chalk.yellow(`[OX]PluginAssignConfig:error happened in '${path}'`));
      console.log(chalk.red(e.message));
      console.log(e);
      process.exit(0);
    }
  }
  return {};
};

const defaultBuildInConfigDir = path.resolve(__dirname, '../config');

class AssignConfig extends Plugin {
  constructor(key, buildInConfigDir = defaultBuildInConfigDir) {
    if (!key) {
      console.log(chalk.red('[OX]PluginAssignConfig:`key` is required'));
      process.exit(0);
    }
    super(`${prefix}/assignConfig/${key}`);
    this.key = key;
    this.buildInConfigDir = buildInConfigDir;
  }

  getHooks() {
    return {
      [`config.assign.${this.key}.userConfig.before`]: new AsyncSeriesWaterfallHook([
        'buildInConfig',
        'others',
      ]),
      [`config.assign.${this.key}.userConfig.done`]: new AsyncSeriesWaterfallHook([
        'userConfig',
        'others',
      ]),
      [`config.assign.${this.key}.merged`]: new AsyncSeriesWaterfallHook([
        'mergedConfig',
        'others',
      ]),
      [`config.assign.${this.key}.done`]: new AsyncParallelHook(['config', 'hooks']),
    };
  }

  apply(ox) {
    ox.hooks['config.assign'].tapPromise(this.name, async (config, hooks) => {
      const waitDependencies = getWaitDependencies(config, hooks);
      let buildInConfig = await getConfig(
        {},
        path.resolve(this.buildInConfigDir, `./${this.key}.config.js`),
        { config, hooks, waitDependencies },
      );
      buildInConfig = await hooks[`config.assign.${this.key}.userConfig.before`].promise(
        buildInConfig,
        { config, hooks, waitDependencies },
      );
      const {
        [keys['rc-config']]: {
          dir: { config: configDir },
        },
      } = config;
      let userConfig = await getConfig(
        buildInConfig,
        resolvePath(configDir, `./${this.key}.config.js`),
        {
          config,
          hooks,
          waitDependencies,
        },
      );
      userConfig = await hooks[`config.assign.${this.key}.userConfig.done`].promise(userConfig, {
        buildInConfig,
        config,
        hooks,
      });
      let mergedConfig = mergeConfig(buildInConfig, userConfig);
      mergedConfig = await hooks[`config.assign.${this.key}.merged`].promise(mergedConfig, {
        userConfig,
        buildInConfig,
        config,
        hooks,
      });
      Object.assign(config, { [this.key]: mergedConfig });
      HasAssigned[this.key] = true;
      await hooks[`config.assign.${this.key}.done`].promise(config, hooks);
    });
  }
}

export default AssignConfig;
