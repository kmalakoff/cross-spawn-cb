import assert from 'assert';
import childProcess from 'child_process';
import spawn, { crossSpawn, type SpawnError } from 'cross-spawn-cb';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));

// A separate process sends SIGKILL after both output writes complete.
const SIGNAL_STDOUT = 'owned-signal-stdout\n';
const SIGNAL_STDERR = 'owned-signal-stderr\n';
const SIGNAL_FIXTURE = path.join(__dirname, '..', 'fixtures', 'signal.cjs');

const SIGNAL_CASE_NAMES = {
  callback: 'callback rejects a signaled child once after buffered output',
  promise: 'Promise rejects a signaled child after buffered output',
  sync: 'native sync throws for a signaled child after buffered output',
  enoent: 'public worker retains original ENOENT Error and calls back once through close',
};

function assertSignalFailure(error: unknown, status: number | null = null): void {
  assert.ok(error instanceof Error, 'signal termination must reject with an Error');
  assert.ok('status' in error && 'signal' in error && 'stdout' in error && 'stderr' in error && 'pid' in error);
  assert.strictEqual(error.status, status);
  assert.strictEqual(error.signal, 'SIGKILL');
  assert.deepEqual((error as SpawnError).output, [null, SIGNAL_STDOUT, SIGNAL_STDERR]);
  assert.strictEqual(error.stdout, SIGNAL_STDOUT);
  assert.strictEqual(error.stderr, SIGNAL_STDERR);
  const pid = error.pid;
  assert.ok(typeof pid === 'number' && pid > 0);
  assert.throws(
    () => process.kill(pid, 0),
    (failure: unknown) => failure instanceof Error && 'code' in failure && failure.code === 'ESRCH',
    'the exact owned child must already be absent'
  );
}

(process.platform === 'win32' ? describe.skip : describe)('real POSIX signal outcomes', () => {
  it(SIGNAL_CASE_NAMES.callback, (done) => {
    let calls = 0;
    let observedError: unknown;
    let observedResult: unknown;
    spawn(process.execPath, [SIGNAL_FIXTURE], { encoding: 'utf8' }, (error, result) => {
      calls += 1;
      assert.strictEqual(calls, 1, 'the callback must never run twice');
      observedError = error;
      observedResult = result;
      setTimeout(() => {
        assert.strictEqual(calls, 1);
        assert.strictEqual(observedResult, undefined);
        assertSignalFailure(observedError);
        done();
      }, 0);
    });
  });

  it(SIGNAL_CASE_NAMES.promise, function () {
    if (typeof Promise !== 'function') return this.skip();
    return spawn(process.execPath, [SIGNAL_FIXTURE], { encoding: 'utf8' }).then(
      () => {
        throw new Error('signal termination must not fulfill the request');
      },
      (error: unknown) => {
        assertSignalFailure(error);
      }
    );
  });

  it(SIGNAL_CASE_NAMES.sync, function () {
    if (typeof childProcess.spawnSync !== 'function') return this.skip();
    const reference = childProcess.spawnSync(process.execPath, [SIGNAL_FIXTURE], { encoding: 'utf8' });
    assert.ifError(reference.error);
    assert.strictEqual(reference.signal, 'SIGKILL');
    let failed = false;
    let failure: unknown;
    try {
      spawn.sync(process.execPath, [SIGNAL_FIXTURE], { encoding: 'utf8' });
    } catch (error) {
      failed = true;
      failure = error;
    }
    assert.ok(failed, 'signal termination must throw');
    assertSignalFailure(failure, reference.status);
  });
});

describe('real async spawn errors', () => {
  it(SIGNAL_CASE_NAMES.enoent, (done) => {
    const missing = path.join(__dirname, '..', '..', '.tmp', 'signal-regression-missing-node');
    assert.ok(!fs.existsSync(missing), 'the missing-command fixture path must not exist');
    const child = crossSpawn(missing, [], { encoding: 'utf8' });
    let originalError: Error | undefined;
    let callbackError: SpawnError | undefined;
    let callbackResult: unknown;
    let calls = 0;
    child.on('error', (error) => {
      originalError = error;
    });
    child.once('close', (status, signal) => {
      setTimeout(() => {
        assert.strictEqual(calls, 1);
        if (originalError) {
          assert.ok(originalError instanceof Error);
          assert.strictEqual(callbackError, originalError, 'the original spawn Error must be preserved');
          assert.strictEqual(callbackError?.code, 'ENOENT');
        } else {
          // Node 0.8 reports execvp failure through close instead of an error event.
          assert.strictEqual(status, 127);
          assert.strictEqual(signal, null);
          assert.ok(callbackError instanceof Error);
          assert.strictEqual(callbackError.status, status);
          assert.strictEqual(callbackError.signal, signal);
          assert.strictEqual(callbackError.stderr, 'execvp(): No such file or directory\n');
        }
        assert.strictEqual(callbackResult, undefined);
        done();
      }, 0);
    });
    spawn.worker(child, { encoding: 'utf8' }, (error, result) => {
      calls += 1;
      assert.strictEqual(calls, 1, 'the callback must never run twice');
      callbackError = error;
      callbackResult = result;
    });
  });
});
