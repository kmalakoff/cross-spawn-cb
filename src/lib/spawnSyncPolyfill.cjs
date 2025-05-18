const path = require('path');

const workerPath = path.join(__dirname, '..', '..', 'cjs', 'spawn.js');

let functionExec = null; // break dependencies
module.exports = function spawnSyncPolyfill(cmd, args, options) {
  if (!functionExec) functionExec = require('function-exec-sync');
  return functionExec({ callbacks: true }, workerPath, cmd, args, options || {});
};
