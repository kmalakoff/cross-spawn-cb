var spawn = require('cross-spawn');
var assign = require('object.assign');
var callOnce = require('call-once-fn');
var Queue = require('queue-cb');
var eos = require('end-of-stream');

module.exports = function crossSpawnCallback(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = assign({}, options || {});
  var result = {};
  var queue = new Queue();

  var child = spawn(command, args, options);
  var stdout = options.stdout === 'string';
  if (stdout) {
    delete options.stdout;
    var text = '';
    queue.defer(function (callback) {
      child.stdout.on('data', function (chunk) {
        text += chunk.toString();
      });
      eos(child.stdout, function (err) {
        if (err) return callback(err);
        result.stdout = text;
        callback();
      });
    });
  }

  queue.defer(function (callback) {
    callback = callOnce(callback);
    child.on('error', callback);
    child.on('close', function (code) {
      result.code = code;
      callback();
    });
  });

  queue.await(function (err) {
    err ? callback(err) : callback(null, result);
  });

  return child;
};
