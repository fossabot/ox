import fs from 'fs-extra';
import path from 'path';

let name = 'webpack-app';
let version = '0.0.1';
try {
  const pathPackageJson = path.resolve(process.cwd(), './package.json');
  if (fs.existsSync(pathPackageJson)) {
    /* eslint-disable import/no-dynamic-require,global-require */
    const { name: appName, version: appVersion } = require(pathPackageJson);
    /* eslint-enable import/no-dynamic-require,global-require */
    if (Object.prototype.toString.call(appName) === '[object String]') {
      name = appName;
    }
    if (Object.prototype.toString.call(appVersion) === '[object String]') {
      version = appVersion;
    }
  }
} catch (e) {} //eslint-disable-line

export default () => ({
  name,
  version,
  runtime: { browsers: ['Chrome >= 55'] },
});
