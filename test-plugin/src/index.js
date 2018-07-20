import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { Plugin } from '../../plugins';

class TestPlugin extends Plugin {
  constructor() {
    super('@ox/test-plugin/test');
  }

  apply(ox) {
    ox.hooks['config.assign'].tapPromise(
      this.name,
      () =>
        new Promise(resolve => {
          fs.readFile(path.resolve(__dirname, '../../.babelrc'), (err, buff) => {
            if (!err) {
              resolve({ babel: JSON.parse(buff.toString()) });
              return;
            }
            console.log(chalk.red(`[OX]PluginBuildOXPlugin:${err.message || err}`));
            console.log(err);
            process.exit(0);
          });
        }),
    );
  }
}

export default TestPlugin;
