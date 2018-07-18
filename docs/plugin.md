# Plugin

> Plugin can response to all defined hooks and define new hooks,it also has the ability to use other plugins

## Define Plugin

just extends the `Plugin`,you define a new Plugin that can used by `ox`

```js
const { Plugin } = require('@vzhdi/ox/plugins');

class YourPlugin extends Plugin {
  constructor() {
    super('plugin name');
  }

  /* Optional
  * To run this plugin,must run another plugins first
  * return array dependent plugins
  */
  getDependencies(config) {
    return [];
  }
  /* Optional
  * This plugin can regist some hooks another plugin may used
  * return plain object hooks
  */
  getHooks() {
    return {};
  }

  /* Required
  * Response to the hooks defined by another plugins
  * ox:{config:Object,hooks:Object}
  */
  apply(ox) {
    ox.hooks['config.assign'].tapPromise(this.name, (...args) => {
      // others code
      return Promise.resolve({});
    });
    ox.hooks.run.tapPromise(this.name, (...args) => {
      // others code
      return Promise.resolve();
    });
  }
}

module.exports = YourPlugin;
```

## Use Plugin

Use plugin in your `.oxrc.js` file which is located in app root directory

```js
const YourPlugin1 = require('your-plugin-1-path');
const YourPlugin2 = require('your-plugin-2-path');
const NodeEnv = process.env.NODE_ENV;
module.exports = {
  plugins: [
    // regist the plugins you need
    new YourPlugin1(),
    NodeEnv === 'development' ? new YourPlugin2() : null,
  ],
};
```

> use plugins in your registed orders, up to down

## Define or Response to hooks

> See [hook](./hook.md) for info how to write or use hooks
