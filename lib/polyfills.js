var path = require('path');
if (typeof path.delimiter === 'undefined') path.delimiter = process.platform === 'win32' ? ';' : ':';

var cp = require('child_process');
if (!cp.spawnSync) {
  var functionExec = require('function-exec-sync');

  cp.spawnSync = function spawnSync(command, args, options) {
    options = options || {};
    var filePath = path.resolve(__dirname, 'spawnCallback.js');
    return functionExec({ callbacks: true }, filePath, command, args, options);
  };
}
