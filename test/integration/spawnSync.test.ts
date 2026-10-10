import assert from 'assert';

import { crossSpawn, type SpawnError, sync } from 'cross-spawn-cb';

describe('sync', () => {
  describe('happy path', () => {
    it('returns a status code', () => {
      const res = sync(process.execPath, ['-e', "process.stdout.write('success-stdout');"], {});
      assert.equal(res.status, 0);
    });

    it('stdout string', () => {
      const res = sync(process.execPath, ['-e', "process.stdout.write('success-stdout');"], { encoding: 'utf8' });
      assert.strictEqual(res.stdout, 'success-stdout');
    });

    it('stdout string (manual)', () => {
      let res = crossSpawn.sync(process.execPath, ['-e', "process.stdout.write('success-stdout');"], { encoding: 'utf8' });
      res = sync.worker(res, { encoding: 'utf8' });
      assert.equal(typeof res.stdout, 'string');
    });
  });

  describe('unhappy path', () => {
    it('stderr string', () => {
      try {
        sync(process.execPath, ['-e', "process.stderr.write('failure-stderr', function () { process.exit(7); });"], { encoding: 'utf8' });
        assert.ok(false);
      } catch (err) {
        assert.ok(typeof (err as SpawnError).status === 'number');
        assert.strictEqual((err as SpawnError).status, 7);
        assert.strictEqual((err as SpawnError).stderr, 'failure-stderr');
      }
    });
  });
});
