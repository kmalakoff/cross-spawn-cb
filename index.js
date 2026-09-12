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
  } else if (!options) options = {};
  else options = assign({}, options);
  callback = once(callback);

  var result = { stdout: null, stderr: null };
  if (options.stdio === 'string' || options.stdout === 'string') {
    result.stdout = [];
    delete options.stdout;
  }
  if (options.stdio === 'string' || options.stderr === 'string') {
    result.stderr = [];
    delete options.stderr;
  }
  var cp = spawn(command, args, options);

  if (cp.stdout && result.stdout) {
    cp.stdout.on('data', function (chunk) {
      result.stdout.push(chunk);
    });
  }
  if (cp.stderr && result.stderr) {
    cp.stderr.on('data', function (chunk) {
      result.stderr.push(chunk);
    });
  }

  cp.on('error', function error(err) {
    // some versions of node emit both an error and close
    if (err.code !== 'OK') return callback(err);
  });

  cp.on('close', function close(status) {
    nextTick(function closeNextTick() {
      result.status = status;
      var err = result.status ? new Error('Non-zero exit code: ' + result.status) : null;
      if (result.stderr && result.stderr.length) {
        err = err || new Error('stderr has content');
        err.stderr = result.stderr.join('');
      } else result.stderr = null;
      if (err) return callback(err);
      if (result.stdout) result.stdout = result.stdout.join('');
      callback(null, result);
    });
  });
};

module.exports.sync = require('./lib/sync');
