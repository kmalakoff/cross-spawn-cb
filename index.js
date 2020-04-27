var spawn = require('cross-spawn');
var callOnce = require('call-once-next-tick');

module.exports = function crossSpawnCallback(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  callback = callOnce(callback);

  var child = spawn(command, args, options);
  child.on('error', callback);
  child.on('close', function (code) {
    callback(null, { exitCode: code });
  });
};
