#!/usr/bin/env node
import fs from 'fs';
import spawn from 'cross-spawn';
/* eslint-disable import/no-unresolved */
import packageJson from '../package.json';
/* eslint-enable import/no-unresolved */

const args = process.argv.slice(2);

const script = args[0];

switch (script) {
  default:
    {
      const scriptPath = require.resolve(`../scripts/${script}`);
      if (fs.existsSync(scriptPath)) {
        const result = spawn.sync('node', [scriptPath].concat(args.slice(1)), { stdio: 'inherit' });
        process.exit(result.status);
      } else {
        console.log(`Unknown script "${script}".`);
        console.log(`Perhaps you need to update ${packageJson.name}`);
      }
    }
    break;
}
