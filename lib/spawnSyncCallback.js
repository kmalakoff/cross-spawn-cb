var assign = require('just-extend');

var major = +process.versions.node.split('.')[0];
var spawnSync = major < 8 ? require('./cross-spawn-3.0.1').sync : require('cross-spawn').sync;

module.exports = function spawnSyncCallback(command, args, options) {
  options = options || {};
  var syncOptions = assign({}, options || {}, {
    env: options.env || process.env,
    stdio: 'pipe',
    encoding: 'utf8',
  });

  var res = spawnSync(command, args, syncOptions);

  // pipe if inherited
  if (res.stdout && (options.stdout === 'inherit' || options.stdio === 'inherit')) {
    process.stdout.write(res.stdout);
    res.stdout = null;
  }
  if (res.stderr && (options.stderr === 'inherit' || options.stdio === 'inherit')) {
    process.stderr.write(res.stderr);
    res.stderr = null;
  }

  // process errors
  var err = res.status !== 0 ? new Error('Non-zero exit code: ' + res.status) : null;
  if (res.stderr && res.stderr.length) {
    err = err || new Error('stderr has content');
    for (var key in res) {
      err[key] = Buffer.isBuffer(res[key]) ? res[key].toString('utf8') : res[key];
    }
  }
  if (err) throw err;
  return res;
};
