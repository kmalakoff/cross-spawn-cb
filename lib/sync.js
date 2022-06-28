var spawnSync = require('./cross-spawn').sync;
var assign = require('just-extend');

module.exports = function crossSpawnSync(command, args, options) {
  options = options || {};

  var result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf-8',
  });
  if (result.stdout && (options.stdout === 'inherit' || options.stdio === 'inherit')) {
    process.stdout.write(result.stdout);
    result.stdout = null;
  }
  if (result.stderr && (options.stderr === 'inherit' || options.stdio === 'inherit')) {
    process.stderr.write(result.stderr);
    result.stderr = null;
  }
  var err = result.status ? new Error('Non-zero exit code: ' + result.status) : null;
  if (result.stderr && result.stderr.length) {
    err = err || new Error('stderr has content');
    err.stderr = result.stderr;
  }
  if (err) throw err;
  return result;
};
