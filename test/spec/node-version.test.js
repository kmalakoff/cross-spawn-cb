var assert = require('assert');
var path = require('path');
// var rimraf = require('rimraf');
var isVersion = require('is-version');
var cr = require('cr');
var nodeInstall = require('node-install-release');
var match = require('match-semver');
var find = require('lodash.find');
var semver = require('semver');
var crossSpawn = require('cross-spawn-cb');

var versionUtils = require('node-version-utils');
var npmVersions = require('../lib/npmVersions');

var NODE = process.platform === 'win32' ? 'node.exe' : 'node';
var TMP_DIR = path.resolve(path.join(__dirname, '..', '..', '.tmp'));
var OPTIONS = {
  cacheDirectory: path.join(TMP_DIR, 'cache'),
  installedDirectory: path.join(TMP_DIR, 'installed'),
};

var VERSIONS = ['v14.1.0', 'v12.18.1', 'v0.8.25'];

function addTests(version) {
  var INSTALL_DIR = path.resolve(path.join(OPTIONS.installedDirectory, version));

  var npmVersion = find(npmVersions, match.bind(null, version));

  describe(version, function () {
    before(function (callback) {
      nodeInstall(version, INSTALL_DIR, OPTIONS, function (err) {
        callback(err);
      });
    });

    describe('spawnOptions', function () {
      it('npm --version', function (done) {
        crossSpawn('npm', ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }), function (err, res) {
          assert.ok(!err);
          var lines = cr(res.stdout).split('\n');
          var resultVersion = lines.slice(-2, -1)[0];
          assert.ok(isVersion(resultVersion));
          assert.ok(semver.gte(resultVersion, npmVersion.bundled));
          done();
        });
      });

      it('node --version', function (done) {
        crossSpawn(NODE, ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }), function (err, res) {
          assert.ok(!err);
          var lines = cr(res.stdout).split('\n');
          assert.equal(lines.slice(-2, -1)[0], version);
          done();
        });
      });

      it('npm --version', function () {
        try {
          var res = crossSpawn.sync('npm', ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }));
          var lines = cr(res.stdout).split('\n');
          var resultVersion = lines.slice(-2, -1)[0];
          assert.ok(isVersion(resultVersion));
          assert.ok(semver.gte(resultVersion, npmVersion.bundled));
        } catch (err) {
          assert.ok(!err);
        }
      });

      it('node --version', function () {
        try {
          var res = crossSpawn.sync(NODE, ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }));
          var lines = cr(res.stdout).split('\n');
          assert.equal(lines.slice(-2, -1)[0], version);
        } catch (err) {
          assert.ok(!err);
        }
      });
    });
  });
}

describe('node-version', function () {
  // before(function (callback) {
  //   rimraf(TMP_DIR, function (err) {
  //     err && err.code !== 'EEXIST' ? callback(err) : callback();
  //   });
  // });

  describe('happy path', function () {
    for (var i = 0; i < VERSIONS.length; i++) {
      addTests(VERSIONS[i]);
    }
  });

  // TODO
  describe('unhappy path', function () {});
});