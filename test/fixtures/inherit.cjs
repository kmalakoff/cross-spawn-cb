var assert = require('assert');
var spawn = require('cross-spawn-cb').default;
var sync = process.argv[2] === 'sync';
var nativeSync = typeof require('child_process').spawnSync === 'function';
var status = Number(process.argv[3]);
var script = "process.stdout.write('inherited-stdout\\n', function () { process.stderr.write('inherited-stderr\\n', function () { process.exit(" + status + '); }); });';
function check(error, result) {
  if (status) {
    assert.ok(error instanceof Error);
    assert.strictEqual(error.status, status);
    assert.strictEqual(error.stdout, sync && !nativeSync ? 'inherited-stdout\n' : null);
    assert.strictEqual(error.stderr, sync && !nativeSync ? 'inherited-stderr\n' : null);
  } else {
    assert.ifError(error);
    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stdout, null);
    assert.strictEqual(result.stderr, null);
  }
}
if (sync) {
  var result;
  var failure;
  try {
    result = spawn.sync(process.execPath, ['-e', script], { stdio: 'inherit' });
  } catch (error) {
    failure = error;
  }
  check(failure, result);
} else {
  spawn(process.execPath, ['-e', script], { stdio: 'inherit' }, check);
}
