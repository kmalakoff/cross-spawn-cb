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

const spawn_ = require('cross-spawn-6.0.5');

const NODES = ['node', 'node.exe', 'node.cmd'];
function parse(command, args, options) {
  if (NODES.indexOf(path.basename(command).toLowerCase()) >= 0) {
    const env = options ? options.env || process.env : process.env;
    command = env.NODE || env.npm_node_execpath;
  }
  return spawn_._parse(command, args, options);
}
const enoent = spawn_._enoent;

function spawn(command, args, options) {
  const parsed = parse(command, args, options);
  const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
  enoent.hookChildProcess(spawned, parsed);
  return spawned;
}

function spawnSync(command, args, options) {
  const parsed = parse(command, args, options);
  const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
  result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
  return result;
}

module.exports = spawn;
module.exports.spawn = spawn;
module.exports.sync = spawnSync;
module.exports._parse = parse;
module.exports._enoent = enoent;
