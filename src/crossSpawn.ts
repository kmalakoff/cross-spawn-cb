import type { ChildProcess } from 'child_process';
import cp from 'child_process';
import Module from 'module';
import path from 'path';
import spawnSyncPolyfill from './polyfills/spawnSync.cjs';
import type { Enoent, Parsed, SpawnOptions, SpawnResult, SpawnSyncOptions } from './types.ts';

const major = +process.versions.node.split('.')[0];
const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
const crossSpawn = _require(major <= 7 ? '../../assets/cross-spawn.cjs' : 'cross-spawn');

export default function spawn(command: string, args: string[], options?: SpawnOptions): ChildProcess {
  const parsed = spawn._parse(command, args, options);
  const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
  spawn._enoent.hookChildProcess(spawned, parsed);
  return spawned;
}

const cpSpawnSync = cp.spawnSync || spawnSyncPolyfill;
spawn.sync = function sync(command: string, args: string[], options?: SpawnSyncOptions): SpawnResult {
  const parsed = spawn._parse(command, args, options) as Parsed;
  const res = cpSpawnSync(parsed.command, parsed.args, parsed.options);
  res.error = res.error || spawn._enoent.verifyENOENTSync(res.status, parsed);
  return res;
};

// patch earlier versions of cross-spawn with inconsistent handling of node
const NODES = ['node', 'node.exe', 'node.cmd'];
function _parse(command: string, args: string[], options?: SpawnOptions | SpawnSyncOptions): Parsed {
  if (NODES.indexOf(path.basename(command).toLowerCase()) >= 0) {
    const env = options ? options.env || process.env : process.env;
    command = env.NODE || env.npm_node_execpath;
  }
  return crossSpawn._parse(command, args, options);
}
spawn._parse = (major <= 7 ? _parse : crossSpawn._parse) as typeof _parse;
spawn._enoent = crossSpawn._enoent as Enoent;
