/* eslint-disable no-console */

'use strict';

const fs = require('fs');

const nonExactCharacters = '~^*x><|'.split('');

function checkExact(deps) {
  return Object.entries(deps)
    .reduce((res, [key, value]) => {
      if (value.indexOf('git+') === 0) {
        if (!value.includes('#')) {
          res.log.push(`Dependency ${key} should be linked to git commit or branch, got "${value}"`);
          res.result = true;
          return res;
        }
      }
      else if (nonExactCharacters.some(char=>value.includes(char))) {
        res.log.push(`Dependency ${key} should be exact, got "${value}"`);
        res.result = true;
        return res;
      }
      return res;
    }, {log: [], result: false});
}

function checkPackageByData(parsed)
{
  let allDeps;
  let foundNonExact;
  try {
    allDeps = Object.assign({}, parsed.dependencies || {}, parsed.devDependencies || {});
    foundNonExact = checkExact(allDeps);
  }
  catch (err) {
    return {result: false, log: err.message};
  }
  if (foundNonExact.result) {
    const messages = `Check for exact dependencies failed!\n${foundNonExact.log.join('\n')}`;
    return {result: false, log: messages};
  }
  return {result: true, log: 'all deps are exact.'};
}

function checkPackageByPath(path) {
  let packageData;
  let parsed;
  try {
    packageData = fs.readFileSync(path, {encoding: 'utf8'});
    parsed = JSON.parse(packageData);
  }
  catch (err) {
    return {result: false, log: err.message};
  }
  return checkPackageByData(parsed);
}


module.exports = {checkPackageByData, checkPackageByPath};
