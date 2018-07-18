# BuildIn Plugins

## AssignConfigPlugin

`AssignConfigPlugin` can assign one `key`'s configInfo into the ox `config` object

it search `key.config.js` both in `buildInConfigDir` and user's `config dir`

> you can specific user's config dir by writing the `.oxrc.js` whth { dir : { config : 'config dir' } }

Constructor

```js
// defaultBuildInConfigDir=require.path('@vzhdi/ox/config')
class AssignConfigPlugin extends Plugin {
  constructor(key, buildInConfigDir = defaultBuildInConfigDir) {
    if (!key) {
      console.log(chalk.red('[OX]AssignConfigPlugin:`key` is required'));
      process.exit(0);
    }
    super(`${prefix}/assignConfig/${key}`);
    this.key = key;
    this.buildInConfigDir = buildInConfigDir;
  }
}
```

## AutoAssignConfigPlugin

`AutoAssignConfigPlugin` find all config files in the directory you send and use `AssignConfigPlugin` to assgin config

> `ox` has buildIn use of this plugin for '@vzhdi/ox/config' and user's config dir,so you don't need to use `AssignConfigPlugin` almostly,just write your config file

Constructor

```js
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
}
```

## BabelPresetResetPlugin

`BabelPresetResetPlugin` give you ability to reset babel preset options

Constructor

```js
class BabelPresetResetPlugin extends Plugin {
  constructor(name, options = {}) {
    super(`${prefix}/babelPresetReset/${(idx += 1)}`);
    this.presetName = name;
    this.options = options;
  }
}
```

## BabelPluginResetPlugin

`BabelPluginResetPlugin` give you ability to reset babel plugin options

Constructor

```js
class BabelPluginResetPlugin extends Plugin {
  constructor(name, options = {}) {
    super(`${prefix}/babelPluginReset/${(idx += 1)}`);
    this.pluginName = name;
    this.options = options;
  }
}
```
