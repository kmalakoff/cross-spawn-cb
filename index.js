var spawn = require('cross-spawn');
var assign = require('object.assign');
var callOnce = require('call-once-next-tick');

module.exports = function crossSpawnCallback(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = assign({}, options || {});
  callback = callOnce(callback);

  var stdout = options.stdout === 'string';
  var text = '';
  if (stdout) delete options.stdout;

  var child = spawn(command, args, options);
  child.on('error', callback);
  child.on('close', function (code) {
    var result = { code: code };
    if (stdout) result.stdout = text;
    callback(null, result);
  });

  if (stdout) {
    child.stdout.on('data', function (chunk) {
      text += chunk.toString();
    });
  }
  return child;
};
