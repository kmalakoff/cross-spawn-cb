require('core-js/actual/object/assign');
require('core-js/actual/object/keys');
require('core-js/actual/array/find');
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
  const spawnCallback = path.join(__dirname, '..', 'dist', 'cjs', 'spawnCallback.js');

  let functionExec = null; // break dependencies
  cp.spawnSync = function spawnSyncPolyfill(cmd, args, options) {
    if (!functionExec) functionExec = require('function-exec-sync');
    return functionExec({ callbacks: true }, spawnCallback, cmd, args, options || {});
  };
}

const NODES = ['node', 'node.exe', 'node.cmd'];
function patchNode(command, _args, options) {
  if (NODES.indexOf(path.basename(command).toLowerCase()) < 0) return command;

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  const env = options.env || process.env;
  return env.NODE || env.npm_node_execpath;
}

const spawn_ = require('cross-spawn-6.0.5');
module.exports = spawn_;
module.exports.spawn = (command, args, options, callback) => spawn_.spawn(patchNode(command, args, options), args, options, callback);
module.exports.spawnSync = (command, args, options) => spawn_.sync(patchNode(command, args, options), args, options);
module.exports._parse = spawn_._parse;
module.exports._enoent = spawn_._enoent;
