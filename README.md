# @vzhdi/ox &middot; ![node](https://img.shields.io/node/v/@vzhdi/ox.svg) [![npm version](https://img.shields.io/npm/v/@vzhdi/ox.svg?style=flat)](https://www.npmjs.com/package/@vzhdi/ox)

> a plugin based frontend framework used for dev and build

## Install

Using npm:

```sh
npm install --save-dev @vzhdi/ox
```

or using yarn:

```sh
yarn add @vzhdi/ox --dev
```

## Usage

### Support script

#### start

> development the app

#### build

> build the app

#### deploy

> deploy the app to server

#### babel

> transform javascript using babel.usage: ox babel ./src ./lib

#### plugin

> build an ox plugin.usage: ox plugin ./src ./lib

```js
{
  "script":"cross-env NODE_ENV=development ox start"
}
```

### Config

config use one file named `.oxrc.js` located in app root

> used plugins may require you set another options

```js
const YourPlugin1 = require('your-plugin-1-path');
const YourPlugin2 = require('your-plugin-2-path');
const NodeEnv = process.env.NODE_ENV;
module.exports = {
  dir: {
    config: './config', // user config dir
  },
  plugins: [
    // regist the plugins you need
    new YourPlugin1(),
    NodeEnv === 'development' ? new YourPlugin2() : null,
  ],
};
```

### Plugin Development

[hook](https://github.com/vzhdi/ox/blob/master/docs/hook.md) : view doc to see how to use hooks and define hooks.

[plugin](https://github.com/vzhdi/ox/blob/master/docs/plugin.md) : view doc to see how to write or use plugin.

[buildInPlugins](https://github.com/vzhdi/ox/blob/master/docs/buildIn-plugins.md) : list the buildIn Plugins

[assignConfig](https://github.com/vzhdi/ox/blob/master/docs/assign-config.md) :view how to assign config info

## LICENSE

MIT
