import assert from 'assert';
import spawn, { crossSpawn, type SpawnError } from 'cross-spawn-cb';

describe('callback', () => {
  describe('happy path', () => {
    it('returns a status code', (done) => {
      spawn(process.execPath, ['-e', "process.stdout.write('success-stdout');"], {}, (err, res) => {
        if (err) return done(err);
        assert.equal(res?.status, 0);
        done();
      });
    });

    it('stdout string', (done) => {
      spawn(process.execPath, ['-e', "process.stdout.write('success-stdout');"], { encoding: 'utf8' }, (err, res) => {
        if (err) return done(err);
        assert.strictEqual(res?.stdout, 'success-stdout');
        assert.equal(res?.status, 0);
        done();
      });
    });

    it('stdout string (manual)', (done) => {
      const cp = crossSpawn(process.execPath, ['-e', "process.stdout.write('success-stdout');"], { encoding: 'utf8' });
      spawn.worker(cp, { encoding: 'utf8' }, (err, res) => {
        if (err) return done(err);
        assert.equal(typeof res?.stdout, 'string');
        assert.equal(res?.status, 0);
        done();
      });
    });
  });

  describe('unhappy path', () => {
    it('stderr string', (done) => {
      spawn(process.execPath, ['-e', "process.stderr.write('failure-stderr', function () { process.exit(7); });"], { encoding: 'utf8' }, (err, res) => {
        assert.ok(!res);
        assert.ok(!!err);
        assert.ok(typeof (err as SpawnError).status === 'number');
        assert.strictEqual((err as SpawnError).status, 7);
        assert.strictEqual((err as SpawnError).stderr, 'failure-stderr');
        done();
      });
    });
  });
});

describe('native Promise ordinary outcomes', () => {
  it('fulfills an ordinary successful child after buffered output', function () {
    if (typeof Promise !== 'function') return this.skip();
    return spawn(process.execPath, ['-e', "process.stdout.write('promise-success-stdout\\n', function () { process.stderr.write('promise-success-stderr\\n', function () {}); });"], { encoding: 'utf8' }).then((result) => {
      assert.strictEqual(result.status, 0);
      assert.strictEqual(result.signal, null);
      assert.strictEqual(result.stdout, 'promise-success-stdout\n');
      assert.strictEqual(result.stderr, 'promise-success-stderr\n');
      assert.strictEqual(result.output.length, 3);
      assert.strictEqual(result.output[0], null);
      assert.strictEqual(result.output[1], 'promise-success-stdout\n');
      assert.strictEqual(result.output[2], 'promise-success-stderr\n');
    });
  });

  it('rejects an ordinary nonzero child after buffered output', function () {
    if (typeof Promise !== 'function') return this.skip();
    return spawn(process.execPath, ['-e', "process.stdout.write('promise-nonzero-stdout\\n', function () { process.stderr.write('promise-nonzero-stderr\\n', function () { process.exit(7); }); });"], { encoding: 'utf8' }).then(
      () => {
        throw new Error('an ordinary nonzero child must reject the request');
      },
      (error: unknown) => {
        assert.ok(error instanceof Error, 'an ordinary nonzero child must reject with an Error');
        assert.ok('status' in error && 'signal' in error && 'stdout' in error && 'stderr' in error && 'output' in error);
        assert.strictEqual(error.status, 7);
        assert.strictEqual(error.signal, null);
        assert.strictEqual(error.stdout, 'promise-nonzero-stdout\n');
        assert.strictEqual(error.stderr, 'promise-nonzero-stderr\n');
        assert.ok(Array.isArray(error.output));
        assert.strictEqual(error.output.length, 3);
        assert.strictEqual(error.output[0], null);
        assert.strictEqual(error.output[1], 'promise-nonzero-stdout\n');
        assert.strictEqual(error.output[2], 'promise-nonzero-stderr\n');
      }
    );
  });
});
