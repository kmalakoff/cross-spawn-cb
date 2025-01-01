import assert from 'assert';

import { crossSpawn, sync } from 'cross-spawn-cb';

describe('sync', () => {
  describe('happy path', () => {
    it('returns a status code', () => {
      try {
        const res = sync('ls', [], {});
        assert.equal(res.status, 0);
      } catch (err) {
        assert.ok(!err, err ? err.message : '');
      }
    });

    it('stdio inherit', () => {
      try {
        const res = sync('ls', [], { stdio: 'inherit' });
        assert.equal(res.stdout, null);
      } catch (err) {
        assert.ok(!err, err ? err.message : '');
      }
    });

    it('stdout string', () => {
      try {
        const res = sync('ls', [], { encoding: 'utf8' });
        assert.equal(typeof res.stdout, 'string');
      } catch (err) {
        console.log(err);
        assert.ok(!err, err ? err.message : '');
      }
    });

    it('stdout string (manual)', () => {
      try {
        let res = crossSpawn.sync('ls', [], { encoding: 'utf8' });
        res = sync.worker(res, { encoding: 'utf8' });
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
        sync('ls', ['junk'], { stdio: 'inherit' });
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('stderr string', () => {
      try {
        sync('ls', ['junk'], { encoding: 'utf8' });
        assert.ok(false);
      } catch (err) {
        assert.ok(typeof err.status === 'number');
        assert.ok(err.status !== 0);
        assert.equal(typeof err.stderr, 'string');
      }
    });
  });
});
