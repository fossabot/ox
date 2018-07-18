# Assign Config

we use the buildInPlugin [AssignConfigPlugin](./buildIn-plugins.md) to get the buildIn config and userConfig for an configKey

## Plain Result

just exports a plain object result

```js
module.exports = {
  // your config
};
```

## Function Return Result

exports a function which return a plain object

```js
/*
* baseConfig : the buildInItemConfig for user config dir or {} for buildInConfig dir
* config : ox.config,contains all config user defined or has assigned
* hooks : ox.hooks,contains all hooks defined by plugins
* waitDependencies : ([...dependencies])=>Promise<Array[dependentItemConfigInfo]>
*/
module.exports = (baseConfig, { config, hooks, waitDependencies }) => {
  return {
    // your config
  };
};
```

### dependent other config info

use `waitDependencies` to wait all other configs assigned done and then return a plain object

> if only one dependent,can simply send string argument and get this specific config

```js
module.exports = (baseConfig, { waitDependencies }) => {
  return waitDependencies(['app', 'env']).then(([appConfig, envConfig]) => {
    return {
      appName: appConfig.name,
      envTarget: envConfig.target,
      // your config
    };
  });
};
```
