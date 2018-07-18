# Hook

> Using `tapable`, see the detail info in [webpack/tapable](https://github.com/webpack/tapable)

## BuildInHooks

```js
{
  'config.assign': new AsyncParallelHook(['config', 'hooks']),
  'config.assign.done': new AsyncParallelHook(['config', 'hooks']),
  ready: new AsyncParallelHook(['ox']),
  run: new AsyncSeriesHook(['ox']),
}
```

> run hooks in this order: [ `config.assign` , `config.assign.done` , `ready` , `run` ]

## Response To Hook In Plugin

```js
class YourPlugin extends Plugin {
  apply(ox) {
    ox.hooks.hookName.tap(this.name, () => {
      // do other things
    });
    ox.hooks.hookAsyncName.tapPromise(this.name, async ({ config, hooks }) => {
      await hooks['yourPlugin.hookName.2'].promise(...args2);
    });
  }
}
```

> NOTE: `tapPromise` must return a `Promise`, you can use async/await to automatic return promise

## Create New Hook For Plugin

> `@vzhdi/ox/hook` is equal to `tapable`

```js
const { SyncHook } = require('@vzhdi/ox/hook');
const { Plugin, AsyncSeriesWaterfallHook } = require('@vzhdi/ox/plugins');
class YourPlugin extends Plugin{
  getHooks(){
    return {
      'yourPlugin.hookName.1': new SyncHook(['arg0', 'arg1', ...others]);
      'yourPlugin.hookName.2': new AsyncSeriesWaterfallHook(['arg0']);
    }
  }
}
```

## Call The Hook In Plugin

```js
class YourPlugin extends Plugin {
  apply(ox) {
    ox.hooks.run.tapPromise(this.name, async ({ config, hooks }) => {
      await hooks['yourPlugin.hookName.1'].call(...args1);
      await hooks['yourPlugin.hookName.2'].promise(...args2);
    });
  }
}
```

## BuildInPlugins Hooks

### AssignConfigPlugin

```js
class AssignConfigPlugin extends Plugin
  getHooks(){
    /* itemKey is the config key name,eg
     * app,babel,webpack
     * after assigned the config is
     * {app:{},babel:{},webpack:{}}
    */
    return {
      [`config.assign.${itemKey}.userConfig.before`]: new AsyncSeriesWaterfallHook([
        'buildInConfig',
        'others',
      ]),
      [`config.assign.${itemKey}.userConfig.done`]: new AsyncSeriesWaterfallHook([
        'userConfig',
        'others',
      ]),
      [`config.assign.${itemKey}.merged`]: new AsyncSeriesWaterfallHook([
        'mergedConfig',
        'others',
      ]),
      [`config.assign.${itemKey}.done`]: new AsyncParallelHook(['config', 'hooks']),
    }
  }
}
```
