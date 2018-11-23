'use strict';

const fs = require('fs');

const nonExactCharacters = '~^*x><|'.split('');

function checkExactVersion(key, value, res)
{
  if (value.indexOf('git+') === 0) {
    if (!value.includes('#')) {
      res.log.push(`Dependency ${key} should be linked to git commit or branch, got "${value}"`);
      res.result = false;
      return res;
    }
    return res;
  }
  if (nonExactCharacters.some(char=>value.includes(char))) {
    res.log.push(`Dependency ${key} should be exact, got "${value}"`);
    res.result = false;
    return res;
  }
  return res;
}

function checkExactPackage(deps) {
  return Object.entries(deps)
    .reduce((res, [key, value]) => {
      return checkExactVersion(key, value, res);
    }, {log: [], result: true});
}

function checkPackageByData(parsed)
{
  let allDeps;
  let foundNonExact;
  try {
    allDeps = Object.assign({}, parsed.dependencies || {}, parsed.devDependencies || {});
    foundNonExact = checkExactPackage(allDeps);
  }
  catch (err) {
    return {result: false, log: err.message};
  }
  if (!foundNonExact.result) {
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


module.exports = {checkPackageByData, checkPackageByPath, checkExactVersion};
