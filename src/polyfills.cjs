require('core-js/actual/object/assign');
require('core-js/actual/object/keys');
require('core-js/actual/array/find');
require('buffer-v6-polyfill');

const path = require('path');
if (!path.delimiter) {
  const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
  path.delimiter = isWindows ? ';' : ':';
}

const cp = require('child_process');
if (!cp.spawnSync) {
  const spawnCallback = path.join(__dirname, 'spawnCallback.js');

  let functionExec = null; // break dependencies
  cp.spawnSync = function spawnSyncPolyfill(cmd, args, options) {
    if (!functionExec) functionExec = require('function-exec-sync');

    return functionExec({ callbacks: true }, spawnCallback, cmd, args, options || {});
  };
}
