// remove NODE_OPTIONS from ts-dev-stack
delete process.env.NODE_OPTIONS;

import assert from 'assert';
import path from 'path';
import url from 'url';
import cr from 'cr';
import isVersion from 'is-version';
import nodeInstall from 'node-install-release';
import resolveVersions from 'node-resolve-versions';
// const _rimraf2 = require('rimraf2');

import * as versionUtils from 'node-version-utils';

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const NODE = isWindows ? 'node.exe' : 'node';
const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const TMP_DIR = path.resolve(path.join(__dirname, '..', '..', '.tmp'));
const OPTIONS = {
  cachePath: path.join(TMP_DIR, 'cache'),
  installedDirectory: path.join(TMP_DIR, 'installed'),
};

const VERSIONS = resolveVersions.sync('>=0.8', { range: 'major,even' });
// const VERSIONS = ['v16.20.2'];

import spawn from 'cross-spawn-cb';

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
        spawn('npm', ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }), (err, res) => {
          assert.ok(!err, err ? err.message : '');
          const lines = cr(res.stdout).split('\n');
          const resultVersion = lines.slice(-2, -1)[0];
          assert.ok(isVersion(resultVersion));
          done();
        });
      });

      it('node --version', (done) => {
        spawn(NODE, ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }), (err, res) => {
          assert.ok(!err, err ? err.message : '');
          const lines = cr(res.stdout).split('\n');
          assert.equal(lines.slice(-2, -1)[0], version);
          done();
        });
      });

      it('npm --version', () => {
        try {
          const res = spawn.sync('npm', ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }));
          const lines = cr(res.stdout).split('\n');
          const resultVersion = lines.slice(-2, -1)[0];
          assert.ok(isVersion(resultVersion));
        } catch (err) {
          assert.ok(!err, err ? err.message : '');
        }
      });

      it('node --version', () => {
        try {
          const res = spawn.sync(NODE, ['--version'], versionUtils.spawnOptions(INSTALL_DIR, { silent: true, encoding: 'utf8' }));
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
  // before((cb) => rimraf2(TMP_DIR, { disableGlob: true }, cb.bind(null, null)));

  describe('happy path', () => {
    for (let i = 0; i < VERSIONS.length; i++) {
      addTests(VERSIONS[i]);
    }
  });

  // TODO
  describe('unhappy path', () => {});
});
