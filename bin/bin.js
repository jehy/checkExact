#!/usr/bin/env node

/* eslint-disable no-console */

'use strict';

const checkExact = require('../check_exact');

const path = process.argv.slice(2).join(' ').trim();
const checked = checkExact.checkPackageByPath(path);
console.log(checked.log);
if (!checked.result)
{
  process.exit(1);
}
process.exit(0);
