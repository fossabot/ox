import path from 'path';
import getConfig from './getConfig';
import hooks from './hooks';
import registPlugin from './registPlugin';
import { AutoAssignConfig } from '../plugins';
import resolvePath from '../utils/resolvePath';
import keys from '../utils/keys';

class OX {
  constructor(script, buildInPlugins = []) {
    this.script = script;
    this.buildInPlugins = buildInPlugins;
    this.config = script === 'plugin' ? {} : getConfig();
    this.hooks = hooks;
  }

  async run() {
    if (this.script === 'plugin') {
      // to build ox plugin , only use the buildInPlugins and config
      this.buildInPlugins.forEach(plugin => registPlugin(plugin, this));
    } else {
      const {
        config: {
          plugins = [],
          [keys['rc-config']]: {
            dir: { config: configDir },
          },
        },
      } = this;
      [new AutoAssignConfig(path.resolve(__dirname, '../config'))]
        .concat(this.buildInPlugins)
        .concat(plugins)
        .concat([
          new AutoAssignConfig(resolvePath(configDir), path.resolve(__dirname, '../config')),
        ])
        .forEach(plugin => registPlugin(plugin, this));
    }

    // ConfigAssign: to get the config info
    this.hooks['config.assign'].intercept({
      register(tapInfo) {
        const { fn, ...others } = tapInfo;
        return {
          ...others,
          fn: function hooksConfigAssignModify(c, h) {
            return fn(c, h).then(d => d && Object.assign(c, d));
          },
        };
      },
    });
    await this.hooks['config.assign'].promise(this.config, this.hooks);

    // ConfigAssignDone: has got all config info
    await this.hooks['config.assign.done'].promise(this.config, this.hooks);

    // Ready: all config and hooks is ready,wait to run
    await this.hooks.ready.promise(this);

    // Run:Run the app
    await this.hooks.run.promise(this);
  }
}

export default OX;
