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

import { spawnOptions } from 'node-version-utils';

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const NODE = isWindows ? 'node.exe' : 'node';
const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const TMP_DIR = path.resolve(path.join(__dirname, '..', '..', '.tmp'));
const OPTIONS = {
  storagePath: path.join(TMP_DIR),
};

const VERSIONS = resolveVersions.sync('>=0.8', { range: 'major,even' });
// const VERSIONS = ['v16.20.2'];

import spawn from 'cross-spawn-cb';

function addTests(version) {
  describe(version, () => {
    let installPath = null;
    before((cb) =>
      nodeInstall(version, { name: version, ...OPTIONS }, (err, res) => {
        installPath = res ? res.installPath : null;
        cb(err);
      })
    );

    describe('spawnOptions', () => {
      it('npm --version', (done) => {
        spawn('npm', ['--version'], spawnOptions(installPath, { silent: true, encoding: 'utf8' }), (err, res) => {
          assert.ok(!err, err ? err.message : '');
          const lines = cr(res.stdout).split('\n');
          const resultVersion = lines.slice(-2, -1)[0];
          assert.ok(isVersion(resultVersion));
          done();
        });
      });

      it('node --version', (done) => {
        spawn(NODE, ['--version'], spawnOptions(installPath, { silent: true, encoding: 'utf8' }), (err, res) => {
          assert.ok(!err, err ? err.message : '');
          const lines = cr(res.stdout).split('\n');
          assert.equal(lines.slice(-2, -1)[0], version);
          done();
        });
      });

      it('npm --version', () => {
        try {
          const res = spawn.sync('npm', ['--version'], spawnOptions(installPath, { silent: true, encoding: 'utf8' }));
          const lines = cr(res.stdout).split('\n');
          const resultVersion = lines.slice(-2, -1)[0];
          assert.ok(isVersion(resultVersion));
        } catch (err) {
          assert.ok(!err, err ? err.message : '');
        }
      });

      it('node --version', () => {
        try {
          const res = spawn.sync(NODE, ['--version'], spawnOptions(installPath, { silent: true, encoding: 'utf8' }));
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
