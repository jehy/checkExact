'use strict';

const {assert} = require('chai');
const exact = require('./exact');
const exactGit = require('./exact-git');
const nonExact = require('./non-exact');
const nonExactGit = require('./non-exact-git');
const checkExact = require('../check_exact');

describe('Some simple tests', ()=>{

  it('should correctly point non exact deps', ()=>{
    const checked = checkExact.checkPackageByData(nonExact);
    assert.equal(checked.result, false);
    assert.deepEqual(checked.log, 'Check for exact dependencies failed!\n'
      + 'Dependency bluebird should be exact, got "^3.5.2"\n'
      + 'Dependency config should be exact, got "^2.0.1"\n'
      + 'Dependency debug should be exact, got "^4.0.1"\n'
      + 'Dependency node-telegram-bot-api should be exact, got "^0.30.0"\n'
      + 'Dependency coveralls should be exact, got "^3.0.2"\n'
      + 'Dependency eslint should be exact, got "^5.5.0"\n'
      + 'Dependency eslint-config-airbnb-base should be exact, got "13.1.*"\n'
      + 'Dependency eslint-loader should be exact, got "^2.1.0"\n'
      + 'Dependency eslint-plugin-import should be exact, got "^2.14.0"\n'
      + 'Dependency eslint-plugin-promise should be exact, got "^4.0.1"\n'
      + 'Dependency eslint-plugin-standard should be exact, got "~4.0.0"\n'
      + 'Dependency mocha should be exact, got "^5.2.0"\n'
      + 'Dependency chai should be exact, got "^4.1.2"\n'
      + 'Dependency nyc should be exact, got "^13.0.1"');
  });

  it('should correctly point non exact git deps', ()=>{
    const checked = checkExact.checkPackageByData(nonExactGit);
    assert.equal(checked.result, false);
    assert.deepEqual(checked.log, 'Check for exact dependencies failed!\n'
      + 'Dependency JSV should be linked to git commit or branch, got "git+https://github.com/onetwotrip/JSV.git"\n'
      + 'Dependency ws.js should be linked to git commit or branch, got "git+https://github.com/onetwotrip/ws.js.git"');
  });


  it('should correctly point exact deps', ()=>{
    const checked = checkExact.checkPackageByData(exact);
    assert.equal(checked.result, true);
    assert.equal(checked.log, 'all deps are exact.');
  });

  it('should correctly point exact git deps', ()=>{
    const checked = checkExact.checkPackageByData(exactGit);
    assert.equal(checked.log, 'all deps are exact.');
    assert.equal(checked.result, true);
  });


  it('should correctly handle file read fail', ()=>{
    const checked = checkExact.checkPackageByPath('non-existent-path');
    assert.equal(checked.result, false);
    assert.equal(checked.log, 'ENOENT: no such file or directory, open \'non-existent-path\'');
  });

  it('should correctly handle bad package data', ()=>{
    const checked = checkExact.checkPackageByData(null);
    assert.equal(checked.result, false);
    assert.equal(checked.log, 'Cannot read property \'dependencies\' of null');
  });

  it('should correctly handle empty package data', ()=>{
    const checked = checkExact.checkPackageByData({});
    assert.equal(checked.log, 'all deps are exact.');
    assert.equal(checked.result, true);
  });
});
