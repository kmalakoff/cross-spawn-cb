import assert from 'assert';
import childProcess from 'child_process';
import { crossSpawn, sync } from 'cross-spawn-cb';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const MISSING_COMMAND = path.join(__dirname, '..', '..', '.tmp', 'sync-spawn-error-missing-executable.exe');
const CASE_NAMES = {
  public: 'public sync throws ENOENT for a missing executable',
  worker: 'sync.worker throws the original provider ENOENT Error without changing its result',
};

describe('real native sync spawn errors', () => {
  before(function () {
    if (typeof childProcess.spawnSync !== 'function') this.skip();
  });

  beforeEach(() => {
    assert.ok(!fs.existsSync(MISSING_COMMAND), 'the missing-executable fixture path must not exist');
  });

  it(CASE_NAMES.public, () => {
    let threw = false;
    let failure: unknown;
    let result: unknown;
    try {
      result = sync(MISSING_COMMAND, [], { encoding: 'utf8' });
    } catch (error) {
      threw = true;
      failure = error;
    }
    assert.ok(threw, 'a missing executable must throw');
    assert.ok(failure instanceof Error);
    assert.ok('code' in failure);
    assert.strictEqual(failure.code, 'ENOENT');
    assert.strictEqual(result, undefined);
  });

  it(CASE_NAMES.worker, () => {
    const providerResult = crossSpawn.sync(MISSING_COMMAND, [], { encoding: 'utf8' });
    const originalError = providerResult.error;
    assert.ok(originalError instanceof Error, 'the real provider must report a spawn Error');
    const originalStatus = providerResult.status;
    const originalSignal = providerResult.signal;
    const originalPid = providerResult.pid;
    let threw = false;
    let failure: unknown;
    let result: unknown;
    try {
      result = sync.worker(providerResult, { encoding: 'utf8' });
    } catch (error) {
      threw = true;
      failure = error;
    }
    assert.ok(threw, 'the worker must throw the original spawn Error');
    assert.strictEqual(failure, originalError);
    assert.ok('code' in originalError);
    assert.strictEqual(originalError.code, 'ENOENT');
    assert.strictEqual(result, undefined);
    assert.strictEqual(providerResult.error, originalError);
    assert.strictEqual(providerResult.status, originalStatus);
    assert.strictEqual(providerResult.signal, originalSignal);
    assert.strictEqual(providerResult.pid, originalPid);
  });
});
