import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';
import chalk from 'chalk';
import Plugin from './Plugin';
import prefix from './helper/prefix';
import AssignConfigPlugin from './AssignConfigPlugin';

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
class AutoAssignConfigPlugin extends Plugin {
  constructor(configDir, buildInConfigDir) {
    if (!configDir) {
      console.log(chalk.red('[OX]AutoAssignConfigPlugin:`configDir` is required'));
      process.exit(0);
    }
    const sha1 = crypto
      .createHash('sha1')
      .update(configDir)
      .digest('hex');
    super(`${prefix}/autoAssignConfig/${sha1}`);
    this.configDir = configDir;
    this.buildInConfigDir = buildInConfigDir || configDir;
  }

  getDependencies() {
    return getConfigKeys(this.configDir).map(
      key => new AssignConfigPlugin(key, this.buildInConfigDir),
    );
  }

  getHooks() {
    return {
      'auto.assign.config': '',
    };
  }

  apply() {}
}
/* eslint-enable class-methods-use-this */

export default AutoAssignConfigPlugin;
