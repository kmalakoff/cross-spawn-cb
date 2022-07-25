var path = require('path')
var worker = path.normalize(__dirname + '/worker.js');

var functionExec = null; // break dependencies
module.exports = function spawnSyncFallback(cmd, args, options) {
  if (!functionExec) functionExec = require('function-exec-sync');
  return functionExec({callbacks:true}, worker, cmd, args, options || {});
}
