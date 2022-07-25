var path = require('path')
var spawnCallback = path.normalize(__dirname + '/spawnCallback.js');

var functionExec = null; // break dependencies
module.exports = function spawnSyncFallback(cmd, args, options) {
  if (!functionExec) functionExec = require('function-exec-sync');
  return functionExec({callbacks:true}, spawnCallback, cmd, args, options || {});
}
