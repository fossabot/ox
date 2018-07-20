# BuildIn Plugins

## AssignConfig

`AssignConfig` can assign one `key`'s configInfo into the ox `config` object

it search `key.config.js` both in `buildInConfigDir` and user's `config dir`

> you can specific user's config dir by writing the `.oxrc.js` whth { dir : { config : 'config dir' } }

```js
// defaultBuildInConfigDir=require.resolve('@vzhdi/ox/config')
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
}
```

> `ox` has buildIn use of `AutoAssignConfig` for '@vzhdi/ox/config' and user's config dir,so if not a plugin developer you should not use this plugin,just write your app's config file,see [assign config](./assign-config.md) doc for how to write a config file

## AutoAssignConfig

`AutoAssignConfig` find all config files in the directory you send and use `AssignConfig` to assgin config

This plugin is build for plugin developer to add new config keys ,or reset the config value which is registed by `ox` or other plugins

> for app developer,don't use this plugin

```js
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
}
```

## BabelPresetReset

`BabelPresetReset` give you ability to reset babel preset options

```js
class BabelPresetReset extends Plugin {
  constructor(name, options = {}) {
    super(`${prefix}/babelPresetReset/${(idx += 1)}`);
    this.presetName = name;
    this.options = options;
  }
}
```

## BabelPluginReset

`BabelPluginReset` give you ability to reset babel plugin options

```js
class BabelPluginReset extends Plugin {
  constructor(name, options = {}) {
    super(`${prefix}/babelPluginReset/${(idx += 1)}`);
    this.pluginName = name;
    this.options = options;
  }
}
```
