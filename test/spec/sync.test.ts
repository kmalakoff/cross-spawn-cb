import assert from 'assert';

// @ts-ignore
import { crossSpawn, sync } from 'cross-spawn-cb';

describe('sync', () => {
  describe('happy path', () => {
    it('returns a status code', () => {
      const res = sync('ls', [], {});
      assert.equal(res.status, 0);
    });

    it('stdio inherit', () => {
      const res = sync('ls', [], { stdio: 'inherit' });
      assert.equal(res.stdout, null);
    });

    it('stdout string', () => {
      const res = sync('ls', [], { encoding: 'utf8' });
      assert.equal(typeof res.stdout, 'string');
    });

    it('stdout string (manual)', () => {
      let res = crossSpawn.sync('ls', [], { encoding: 'utf8' });
      res = sync.worker(res, { encoding: 'utf8' });
      assert.equal(typeof res.stdout, 'string');
    });
  });

  describe('unhappy path', () => {
    it('stdio inherit', () => {
      try {
        sync('ls', ['junk'], { stdio: 'inherit' });
        assert.ok(false);
      } catch (err) {
        assert.ok(typeof err.status === 'number');
        assert.ok(err.status !== 0);
      }
    });

    it('stderr string', () => {
      try {
        sync('ls', ['junk'], { encoding: 'utf8' });
        assert.ok(false);
      } catch (err) {
        assert.ok(typeof err.status === 'number');
        assert.ok(err.status !== 0);
      }
    });
  });
});
