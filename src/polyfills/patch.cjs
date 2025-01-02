require('core-js/actual/object/keys');
require('core-js/actual/array/find');
require('buffer-v6-polyfill');

const path = require('path');
if (!path.delimiter) path.delimiter = process.platform === 'win32' ? ';' : ':';

const cp = require('child_process');
if (!cp.spawnSync) {
  const spawn = path.join(__dirname, '..', 'spawn.cjs');

  let functionExec = null; // break dependencies
  cp.spawnSync = function spawnSyncPolyfill(cmd, args, options) {
    if (!functionExec) functionExec = require('function-exec-sync');

    return functionExec({ callbacks: true }, spawn, cmd, args, options || {});
  };
}
