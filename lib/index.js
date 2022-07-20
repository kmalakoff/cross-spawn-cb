require('./polyfills');

// exclude from polyfils to avoid loading in functionExec
var cp = require('child_process');
if (!cp.spawnSync) {
  var path = require('path')
  var functionExec = require('function-exec-sync');

  cp.spawnSync = function spawnSync(command, args, options) {
    options = options || {};
    var filePath = path.resolve(__dirname, 'spawnCallback.js');
    return functionExec({ callbacks: true }, filePath, command, args, options);
  };
}

module.exports = require('./spawnCallback');
module.exports.spawn = require('./spawnCallback');
module.exports.sync = require('./spawnSyncCallback');
