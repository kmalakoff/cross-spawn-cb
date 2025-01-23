const path = require('path');
const cp = require('child_process');
const cpSpawnSync = require('child_process').spawnSync || require('./spawnSyncPolyfill.cjs');
const crossSpawn = require('../../../assets/cross-spawn.cjs');

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
  const result = cpSpawnSync(parsed.command, parsed.args, parsed.options);
  result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
  return result;
}

module.exports = spawn;
module.exports.spawn = spawn;
module.exports.sync = spawnSync;
module.exports._parse = parse;
module.exports._enoent = enoent;
