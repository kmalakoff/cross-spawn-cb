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

import spawnCallback from './spawnCallback';
export default spawnCallback;
export { default as spawn } from './spawn';
export { default as sync } from './spawnCallbackSync';
