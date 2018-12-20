#!/usr/bin/env node

/* eslint-disable no-console */

'use strict';

const checkExact = require('../check_exact');

const colors = {
  red: ((...args)=>console.log(`\x1b[41m${args.join('')}\x1b[0m`)),
};

const path = process.argv.slice(2).join(' ').trim();
const checked = checkExact.checkPackageByPath(path);
if (!checked.result)
{
  colors.red(checked.log);
  process.exit(1);
}
console.log(checked.log);
process.exit(0);
