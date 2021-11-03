var spawnSync = require('cross-spawn').sync || require('./spawn-sync/spawn-sync.js');
var assign = require('object-assign');

module.exports = function crossSpawnSync(command, args, options) {
  if (!options) options = {};
  else options = assign({}, options);
  if (options.stdio === 'string') {
    options.stdio = 'pipe';
    options.encoding = 'utf-8';
  } else if (options.stdout === 'string') {
    options.stdout = 'pipe';
    options.encoding = 'utf-8';
  } else if (options.stderr === 'string') {
    options.stderr = 'pipe';
    options.encoding = 'utf-8';
  }
  var result = spawnSync(command, args, options);
  var err = result.status ? new Error('Non-zero exit code: ' + result.status) : null;
  if (result.stderr && result.stderr.length) {
    err = err || new Error('stderr has content');
    err.stderr = result.stderr;
  }
  if (err) throw err;
  return result;
};
