var path = require('path');
var spawn = require('cross-spawn');
var assign = require('object.assign');
var callOnce = require('call-once-fn');

// patch for legacy versions of node
if (typeof path.delimiter === 'undefined') path.delimiter = process.platform === 'win32' ? ';' : ':';

module.exports = function crossSpawnCallback(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = assign({}, options || {});
  callback = callOnce(callback);

  var result = {};
  if (options.stdout === 'string') {
    result.stdout = '';
    delete options.stdout;
  }
  if (options.stderr === 'string') {
    result.stderr = '';
    delete options.stderr;
  }
  var cp = spawn(command, args, options);

  if (cp.stdout && typeof result.stdout === 'string')
    cp.stdout.on('data', function (chunk) {
      result.stdout += chunk.toString();
    });
  if (cp.stderr && typeof result.stderr === 'string')
    cp.stderr.on('data', function (chunk) {
      result.stderr += chunk.toString();
    });

  cp.on('error', function (err) {
    // some versions of node emit both an error and close
    if (err.code !== 'OK') return callback(err);
  });
  cp.on('close', function (code) {
    if (result.stderr) return callback(new Error(result.stderr));
    result.code = code;
    callback(null, result);
  });
  return cp;
};
