import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';
import chalk from 'chalk';
import Plugin from './Plugin';
import prefix from './helper/prefix';
import AssignConfig, { getConfig } from './AssignConfig';

// all registed keys
const RegistedKeys = new Set();

const getConfigKeys = dir => {
  const configKeys = [];
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const stat = fs.statSync(path.resolve(dir, file));
    if (stat.isFile()) {
      const match = file.match(/^(.+?)\.config\.js$/);
      if (match) {
        configKeys.push(match[1]);
      }
    }
  });
  return configKeys;
};

/* eslint-disable class-methods-use-this */
class AutoAssignConfig extends Plugin {
  constructor(configDir, buildInConfigDir) {
    if (!configDir) {
      console.log(chalk.red('[OX]PluginAutoAssignConfig:`configDir` is required'));
      process.exit(0);
    }
    const sha1 = crypto
      .createHash('sha1')
      .update(configDir)
      .digest('hex');
    super(`${prefix}/autoAssignConfig/${sha1}`);
    this.configDir = configDir;
    this.buildInConfigDir = buildInConfigDir || configDir;
    /*
    * some plugins may require merge the other plugins's buildIn config
    * if key has registed and buildInConfigDir=== configDir then add on needMergedKey
    */
    this.needMergedKeys = new Set();
  }

  getDependencies() {
    return getConfigKeys(this.configDir).map(key => {
      if (RegistedKeys.has(key)) {
        if (this.buildInConfigDir === this.configDir) {
          this.needMergedKeys.add(key);
        }
        return null;
      }
      RegistedKeys.add(key);
      return new AssignConfig(key, this.buildInConfigDir);
    });
  }

  apply(ox) {
    this.needMergedKeys.forEach(key => {
      ox.hooks[`config.assign.${key}.userConfig.before`].tapPromise(
        this.name,
        async (buildInConfig, { config, hooks, waitDependencies }) => {
          const mergedBuildInConfig = await getConfig(
            buildInConfig,
            path.resolve(this.buildInConfigDir, `./${key}.config.js`),
            { config, hooks, waitDependencies },
          );
          return mergedBuildInConfig;
        },
      );
    });
  }
}
/* eslint-enable class-methods-use-this */

export default AutoAssignConfig;
