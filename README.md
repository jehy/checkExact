# Check-Exact

[![Build Status](https://travis-ci.org/jehy/check-exact.svg?branch=master)](https://travis-ci.org/jehy/check-exact)
[![dependencies Status](https://david-dm.org/jehy/check-exact/status.svg)](https://david-dm.org/jehy/check-exact)
[![devDependencies Status](https://david-dm.org/jehy/check-exact/dev-status.svg)](https://david-dm.org/jehy/check-exact?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/jehy/check-exact/badge.svg?branch=master)](https://coveralls.io/github/jehy/check-exact?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jehy/check-exact/badge.svg)](https://snyk.io/test/github/jehy/check-exact)

Simple module for checking if all your project dependencies are exact.

#### Usage (code)

```js
const checkExact = require('check-exact');

// check by package data
const packageData = require('./package.json')
const checked = checkExact.checkPackageByData(packageData);
assert.equal(checked.log, 'all deps are exact.');
assert.equal(checked.result, true);


// check by package path
const packageFile ='./package.json';
const checked = checkExact.checkPackageBypath(packageFile);
assert.equal(checked.log, 'all deps are exact.');
assert.equal(checked.result, true);
```

#### Usage (cli)

```bash
npm i check-exact
check-exact ./package.json
```

or

```bash
npx check-exact ./package.json
```
