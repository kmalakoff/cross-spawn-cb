if (!Object.assign) Object.assign = require('object-assign');
require('object-keys');
if (!Array.prototype.find)
  Array.prototype.find = function ArrayFind(predicate) {
    for (let i = 0; i < this.length; i++) {
      if (predicate.call(this, this[i], i, this)) return this[i];
    }
    return null;
  };
require('buffer-v6-polyfill');

const path = require('path');

if (!path.delimiter) {
  const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
  path.delimiter = isWindows ? ';' : ':';
}

// early node is missing spawnSync
const cp = require('child_process');
if (!cp.spawnSync) {
  const path = require('path');
  const spawnCallback = path.join(__dirname, 'spawnCallback.js');

  let functionExec = null; // break dependencies
  cp.spawnSync = function spawnSyncPolyfill(cmd, args, options) {
    if (!functionExec) functionExec = require('function-exec-sync');
    return functionExec({ callbacks: true }, spawnCallback, cmd, args, options || {});
  };
}
