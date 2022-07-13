var assign = require('just-extend');

var major = +process.versions.node.split('.')[0];
var spawnSync = major < 8 ? require('./cross-spawn-3.0.1').sync : require('cross-spawn').sync;

module.exports = function spawnSyncCallback(command, args, options) {
  options = options || {}
  var syncOptions = assign({}, options || {}, {
    env: options.env || process.env,
    stdio: 'pipe',
    encoding: 'utf8',
  });
  var result = spawnSync(command, args, syncOptions);
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
