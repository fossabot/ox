import fs from 'fs-extra';
import chalk from 'chalk';
import keys from '../utils/keys';
import configDefault from './config.default';
import resolvePath from '../utils/resolvePath';
import mergeConfig from '../utils/mergeConfig';

/* eslint-disable import/no-mutable-exports */
const config = { [keys['rc-config']]: configDefault, plugins: configDefault.plugins };
/* eslint-enable import/no-mutable-exports */
const rcPath = resolvePath('./.oxrc.js');
if (fs.existsSync(rcPath)) {
  try {
    const rcConfig = require(rcPath); // eslint-disable-line
    config[keys['rc-config']] = mergeConfig(configDefault, rcConfig);
    const { plugins = [] } = rcConfig;
    config.plugins = configDefault.plugins.concat(plugins);
  } catch (e) {
    console.log(chalk.red(`[OX]oxrc:${e.message}`));
    console.log(e);
    process.exit(0);
  }
}

export default config;
