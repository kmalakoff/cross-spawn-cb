// remove NODE_OPTIONS from ts-dev-stack
// biome-ignore lint/performance/noDelete: <explanation>
delete process.env.NODE_OPTIONS;

const assert = require('assert');
const path = require('path');
// var rimraf2 = require('rimraf2');
const isVersion = require('is-version');
const cr = require('cr');
const nodeInstall = require('node-install-release');
const resolveVersions = require('node-resolve-versions');

const versionUtils = require('node-version-utils');

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const NODE = isWindows ? 'node.exe' : 'node';
const TMP_DIR = path.resolve(path.join(__dirname, '..', '..', '.tmp'));
const OPTIONS = {
  cacheDirectory: path.join(TMP_DIR, 'cache'),
  installedDirectory: path.join(TMP_DIR, 'installed'),
};

const VERSIONS = resolveVersions.sync('>=0.8', { range: 'major,even' });
// VERSIONS = ['v16.20.2'];

const spawnCallback = require('../..');

function addTests(version) {
  const INSTALL_DIR = path.resolve(path.join(OPTIONS.installedDirectory, version));

  describe(version, () => {
    before((callback) => {
      nodeInstall(version, INSTALL_DIR, OPTIONS, (err) => {
        if (err) console.log('nodeInstall', err);
        callback(err);
      });
    });

    describe('spawnOptions', () => {
      it('npm --version', (done) => {
        spawnCallback('npm', ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }), (err, res) => {
          assert.ok(!err, err ? err.message : '');
          const lines = cr(res.stdout).split('\n');
          const resultVersion = lines.slice(-2, -1)[0];
          assert.ok(isVersion(resultVersion));
          done();
        });
      });

      it('node --version', (done) => {
        spawnCallback(NODE, ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }), (err, res) => {
          assert.ok(!err, err ? err.message : '');
          const lines = cr(res.stdout).split('\n');
          assert.equal(lines.slice(-2, -1)[0], version);
          done();
        });
      });

      it('npm --version', () => {
        try {
          const res = spawnCallback.sync('npm', ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }));
          const lines = cr(res.stdout).split('\n');
          const resultVersion = lines.slice(-2, -1)[0];
          assert.ok(isVersion(resultVersion));
        } catch (err) {
          assert.ok(!err, err ? err.message : '');
        }
      });

      it('node --version', () => {
        try {
          const res = spawnCallback.sync(NODE, ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }));
          const lines = cr(res.stdout).split('\n');
          assert.equal(lines.slice(-2, -1)[0], version);
        } catch (err) {
          assert.ok(!err, err ? err.message : '');
        }
      });
    });
  });
}

describe('node-version', () => {
  // before(function (callback) {
  //   rimraf2(TMP_DIR, { disableGlob: true }, function (err) {
  //     err && err.code !== 'EEXIST' ? callback(err) : callback();
  //   });
  // });

  describe('happy path', () => {
    for (let i = 0; i < VERSIONS.length; i++) {
      addTests(VERSIONS[i]);
    }
  });

  // TODO
  describe('unhappy path', () => {});
});
