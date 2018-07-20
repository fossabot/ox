import spawn from 'cross-spawn';
import chalk from 'chalk';
import Plugin from '../Plugin';
import prefix from '../helper/prefix';
import guidKey from '../helper/babel-cli-guid-key';

/* eslint-disable class-methods-use-this */
class BabelCli extends Plugin {
  constructor(isBuildPlugin = false) {
    super(`${prefix}/buildIns/babelCli`);
    this.isBuildPlugin = isBuildPlugin;
  }

  apply(ox) {
    ox.hooks.run.tapPromise(this.name, ({ config }) => this.babel(config));
  }

  async babel(config) {
    const { babel: babelConfig } = config;
    process.env[guidKey] = JSON.stringify(babelConfig);
    await this.spawn();
  }

  async spawn() {
    const args = process.argv.slice(2);
    const srcDir = args[0] || './src';
    const outerDir = args[1] || './lib';

    const buildFiles = spawn(
      // 'cross-env',
      `babel ${srcDir} --out-dir ${outerDir} --no-babelrc --presets module:${require.resolve(
        '../helper/babel-cli-preset',
      )} --copy-files`,
      [],
      {
        stdio: [process.stdin, process.stdout, process.stderr],
      },
    );
    await new Promise(resolve =>
      buildFiles.on('close', code => {
        if (code === 0) {
          console.log(
            chalk.green(
              `${
                this.isBuildPlugin ? 'build OX plugin' : 'babel compile files'
              } from '${srcDir}' to '${outerDir}' success`,
            ),
          );
          resolve();
        }
      }),
    );
  }
}
/* eslint-enable class-methods-use-this */

export default BabelCli;
