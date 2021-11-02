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

  var result = {};
  var stdout = null;
  var stderr = null;
  if (options.stdio === 'string') {
    stdout = [];
    delete options.stdout;
    stderr = [];
    delete options.stderr;
  } else if (options.stdout === 'string') {
    stdout = [];
    delete options.stdout;
  } else if (options.stderr === 'string') {
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

  cp.on('close', function close(status) {
    nextTick(function closeNextTick() {
      result.status = status;
      var err = status ? new Error('Non-zero exit code: ' + status) : null;
      if (stderr && stderr.length) {
        stderr = stderr.join('');
        err = err || new Error('stderr has content');
        err.stderr = stderr;
        return callback(err);
      }
      if (err) return callback(err);
      if (stdout) result.stdout = stdout.join('');
      else result.stdout = null;
      callback(null, result);
    });
  });
  return cp;
};

module.exports.sync = require('./lib/sync');
