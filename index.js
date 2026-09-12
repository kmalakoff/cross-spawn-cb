var path = require('path');
var spawn = require('cross-spawn');
var assign = require('object-assign');
var once = require('once');
var nextTick = require('next-tick');

// patch for legacy versions of node
if (typeof path.delimiter === 'undefined') path.delimiter = process.platform === 'win32' ? ';' : ':';

module.exports = function crossSpawnCallback(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = assign({}, options || {});
  callback = once(callback);

  var result = {};
  var stdout = null;
  var stderr = null;
  if (options.stdout === 'string') {
    stdout = [];
    delete options.stdout;
  }
  if (options.stderr === 'string') {
    stderr = [];
    delete options.stderr;
  }
  var cp = spawn(command, args, options);

  if (cp.stdout && stdout) {
    cp.stdout.on('data', function (chunk) {
      stdout.push(chunk);
    });
  }
  if (cp.stderr && stderr) {
    cp.stderr.on('data', function (chunk) {
      stderr.push(chunk);
    });
  }

  cp.on('error', function error(err) {
    // some versions of node emit both an error and close
    if (err.code !== 'OK') return callback(err);
  });

  cp.on('close', function close(code) {
    nextTick(function closeNextTick() {
      var err = code ? new Error('Non-zero exit code: ' + code) : null;
      if (stderr && stderr.length) {
        stderr = stderr.join('');
        err = err || new Error('stderr has content');
        err.stderr = stderr;
        return callback(err);
      }
      if (err) return callback(err);
      if (stdout) result.stdout = stdout.join('');
      callback(null, result);
    });
  });
  return cp;
};
