import fs from 'fs-extra';
import path from 'path';
import Plugin from '../Plugin';
import prefix from '../helper/prefix';
import keys from '../../utils/keys';
import resolvePath from '../../utils/resolvePath';
import AssignConfigPlugin from '../AssignConfigPlugin';

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
  constructor() {
    super(`${prefix}/buildIns/autoAssignConfig`);
  }

  getDependencies(config) {
    const {
      [keys['rc-config']]: {
        dir: { config: configDir },
      },
    } = config;

    return getConfigKeys(path.resolve(__dirname, '../../config'))
      .concat(getConfigKeys(resolvePath(configDir)))
      .map(key => new AssignConfigPlugin(key));
  }

  apply() {}
}
/* eslint-enable class-methods-use-this */

export default AutoAssignConfigPlugin;
