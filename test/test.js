'use strict';

const {assert} = require('chai');
const exact = require('./exact');
const exactGit = require('./exact-git');
const nonExact = require('./non-exact');
const nonExactGit = require('./non-exact-git');
const checkExact = require('../check_exact');

describe('Some simple tests', ()=>{

  describe('should correctly point non exact deps', ()=>{
    const nonExactTests = [{
      key: 'bluebird',
      value: '^3.5.2',
    }, {
      key: 'eslint-config-airbnb-base',
      value: '13.1.*',
    }, {
      key: 'eslint-plugin-standard',
      value: '~4.0.0',
    }, {
      key: 'bluebird',
      value: '^3.5.2',
    }, {
      key: 'bluebird',
      value: '3.5.x',
    }, {
      key: 'bluebird',
      value: '>3.5.2',
    }, {
      key: 'bluebird',
      value: '<3.5.2',
    }, {
      key: 'bluebird',
      value: '3.5.x',
    }];
    nonExactTests.forEach((test)=>{
      it(`should see ${test.value} as non strict`, ()=>{
        const res = {log: [], result: true};
        checkExact.checkExactVersion(test.key, test.value, res);
        assert.equal(res.result, false);
        assert.equal(res.log[0], `Dependency ${test.key} should be exact, got "${test.value}"`);
      });
    });
  });

  describe('should correctly point non exact git deps', ()=>{
    const nonExactTests = [{
      key: 'ws.js',
      value: 'git+https://github.com/onetwotrip/ws.js.git',
    }, {
      key: 'JSV',
      value: 'git+https://github.com/onetwotrip/JSV.git',
    }];
    nonExactTests.forEach((test)=>{
      it(`should see ${test.value} as non strict`, ()=>{
        const res = {log: [], result: true};
        checkExact.checkExactVersion(test.key, test.value, res);
        assert.equal(res.result, false);
        assert.equal(res.log[0], `Dependency ${test.key} should be linked to git commit or branch, got "${test.value}"`);
      });
    });
  });

  describe('should correctly point exact git deps', ()=>{
    const nonExactTests = [{
      key: 'ws.js',
      value: 'git+https://github.com/onetwotrip/ws.js.git#v4.0.3',
    }, {
      key: 'JSV',
      value: 'git+https://github.com/onetwotrip/JSV.git#v2.0.24',
    }];
    nonExactTests.forEach((test)=>{
      it(`should see ${test.value} as strict`, ()=>{
        const res = {log: [], result: true};
        checkExact.checkExactVersion(test.key, test.value, res);
        assert.equal(res.result, true);
      });
    });
  });

  it('should correctly check package data for non exact deps', ()=>{
    const checked = checkExact.checkPackageByData(nonExact);
    assert.equal(checked.result, false);
  });

  it('should correctly check package data for exact deps', ()=>{
    const checked = checkExact.checkPackageByData(exact);
    assert.equal(checked.result, true);
    assert.equal(checked.log, 'all deps are exact.');
  });

  it('should correctly check package data for exact git deps', ()=>{
    const checked = checkExact.checkPackageByData(exactGit);
    assert.equal(checked.log, 'all deps are exact.');
    assert.equal(checked.result, true);
  });

  it('should correctly check package data for non exact git deps', ()=>{
    const checked = checkExact.checkPackageByData(nonExactGit);
    assert.equal(checked.result, false);
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
