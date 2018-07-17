#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fs = _interopRequireDefault(require("fs"));

var _crossSpawn = _interopRequireDefault(require("cross-spawn"));

var _package = _interopRequireDefault(require("../package.json"));

/* eslint-disable import/no-unresolved */

/* eslint-enable import/no-unresolved */
const args = process.argv.slice(2);
const script = args[0];

switch (script) {
  default:
    {
      const scriptPath = require.resolve(`../scripts/${script}`);

      if (_fs.default.existsSync(scriptPath)) {
        const result = _crossSpawn.default.sync('node', [scriptPath].concat(args.slice(1)), {
          stdio: 'inherit'
        });

        process.exit(result.status);
      } else {
        console.log(`Unknown script "${script}".`);
        console.log(`Perhaps you need to update ${_package.default.name}`);
      }
    }
    break;
}