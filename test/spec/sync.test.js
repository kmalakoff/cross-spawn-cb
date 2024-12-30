const assert = require('assert');

const spawn = require('../..');
const spawnSync = spawn.sync;

describe('sync', () => {
  describe('happy path', () => {
    it('returns a status code', () => {
      try {
        const res = spawnSync('ls', [], {});
        assert.equal(res.status, 0);
      } catch (err) {
        assert.ok(!err, err ? err.message : '');
      }
    });

    it('stdio inherit', () => {
      try {
        const res = spawnSync('ls', [], { stdio: 'inherit' });
        assert.equal(res.stdout, null);
      } catch (err) {
        assert.ok(!err, err ? err.message : '');
      }
    });

    it('stdout string', () => {
      try {
        const res = spawnSync('ls', [], { encoding: 'utf8' });
        assert.equal(typeof res.stdout, 'string');
      } catch (err) {
        console.log(err);
        assert.ok(!err, err ? err.message : '');
      }
    });

    it('stdout string (manual)', () => {
      try {
        const options = { encoding: 'utf8' };
        let res = spawn.spawn.sync('ls', [], options);
        res = spawnSync.worker(res, options);
        assert.equal(typeof res.stdout, 'string');
      } catch (err) {
        console.log(err);
        assert.ok(!err, err ? err.message : '');
      }
    });
  });

  describe('unhappy path', function () {
    this.timeout(20000);
    it('stdio inherit', () => {
      try {
        spawnSync('ls', ['junk'], { stdio: 'inherit' });
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('stderr string', () => {
      try {
        spawnSync('ls', ['junk'], { encoding: 'utf8' });
        assert.ok(false);
      } catch (err) {
        assert.ok(typeof err.status === 'number');
        assert.ok(err.status !== 0);
        assert.equal(typeof err.stderr, 'string');
      }
    });
  });
});
