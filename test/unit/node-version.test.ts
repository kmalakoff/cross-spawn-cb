// remove NODE_OPTIONS from ts-dev-stack
delete process.env.NODE_OPTIONS;

import assert from 'assert';
import cr from 'cr';
import isVersion from 'is-version';
import install from 'node-install-release';
import path from 'path';
import url from 'url';

// import rimraf2 from 'rimraf2';

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const NODE = isWindows ? 'node.exe' : 'node';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const TMP_DIR = path.join(path.join(__dirname, '..', '..', '.tmp'));
const OPTIONS = {
  storagePath: path.join(TMP_DIR),
  platform: process.platform,
  arch: 'x64' as NodeJS.Architecture,
};

import * as resolveVersions from 'node-resolve-versions';

const VERSIONS = resolveVersions.sync('>=0.8', { range: 'major,even' });

// @ts-ignore
import spawn from 'cross-spawn-cb';
// VERSIONS.splice(0, VERSIONS.length, 'v0.8.28')
import { spawnOptions } from 'node-version-utils';

function addTests(version) {
  describe(version, () => {
    let installPath = null;
    it('install', (done) => {
      install(version, { name: version, ...OPTIONS }, (err, res) => {
        if (res) installPath = res.installPath;
        if (res) version = res.version;
        done(err);
      });
    });

    it('npm --version', (done) => {
      spawn('npm', ['--version'], spawnOptions(installPath, { encoding: 'utf8' }), (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const lines = cr(res.stdout).split('\n');
        const resultVersion = lines.slice(-2, -1)[0];
        assert.ok(isVersion(resultVersion));
        done();
      });
    });

    it('node --version', (done) => {
      spawn(NODE, ['--version'], spawnOptions(installPath, { encoding: 'utf8' }), (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const lines = cr(res.stdout).split('\n');
        assert.equal(lines.slice(-2, -1)[0], version);
        done();
      });
    });

    it('npm --version sync', () => {
      const res = spawn.sync('npm', ['--version'], spawnOptions(installPath, { encoding: 'utf8' }));
      const lines = cr(res.stdout).split('\n');
      const resultVersion = lines.slice(-2, -1)[0];
      assert.ok(isVersion(resultVersion));
    });

    it('node --version sync', () => {
      const res = spawn.sync(NODE, ['--version'], spawnOptions(installPath, { encoding: 'utf8' }));
      const lines = cr(res.stdout).split('\n');
      assert.equal(lines.slice(-2, -1)[0], version);
    });
  });
}

describe('node-version', () => {
  // before(rimraf2.bind(null, TMP_DIR, { disableGlob: true }));
  // after(rimraf2.bind(null, TMP_DIR, { disableGlob: true }));

  describe('happy path', () => {
    for (let i = 0; i < VERSIONS.length; i++) {
      addTests(VERSIONS[i]);
    }
  });
});
