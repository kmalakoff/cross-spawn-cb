const path = require('path');
const cp = require('child_process');
const crossSpawn = require('../../assets/cross-spawn.cjs');

if (!cp.spawnSync) {
  const workerPath = path.join(__dirname, '..', 'spawn.cjs');

  let functionExec = null; // break dependencies
  cp.spawnSync = function spawnSyncPolyfill(cmd, args, options) {
    if (!functionExec) functionExec = require('function-exec-sync');
    return functionExec({ callbacks: true }, workerPath, cmd, args, options || {});
  };
}

const NODES = ['node', 'node.exe', 'node.cmd'];
function parse(command, args, options) {
  if (NODES.indexOf(path.basename(command).toLowerCase()) >= 0) {
    const env = options ? options.env || process.env : process.env;
    command = env.NODE || env.npm_node_execpath;
  }
  return crossSpawn._parse(command, args, options);
}
const enoent = crossSpawn._enoent;

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
