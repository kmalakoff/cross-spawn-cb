var path = require('path')
var functionExec = require('function-exec-sync');
var assign = require('just-extend');
var SLEEP_MS = 60;

module.exports = function spawnSync(command, args, options) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else if (!options) options = {};
  else options = assign({}, options);
  var filePath = path.resolve(__dirname, 'worker.js');
  return functionExec({callbacks: true, sleep: SLEEP_MS}, filePath, command, args, options);
}
