import type { ChildProcess } from 'child_process';
import Module from 'module';
import type { Enoent, Parsed, SpawnOptions, SpawnResult, SpawnSyncOptions } from './types.ts';

const major = +process.versions.node.split('.')[0];
const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
// Use lightweight shim for legacy Node (<= 7), modern cross-spawn for Node >= 8
const crossSpawn = _require(major <= 7 ? './shim/index.js' : 'cross-spawn');

// Fully delegate to the loaded implementation (shim or cross-spawn)
export default function spawn(command: string, args: string[], options?: SpawnOptions): ChildProcess {
  return crossSpawn(command, args, options);
}

spawn.sync = crossSpawn.sync as (command: string, args: string[], options?: SpawnSyncOptions) => SpawnResult;
spawn._parse = crossSpawn._parse as (command: string, args: string[], options?: SpawnOptions | SpawnSyncOptions) => Parsed;
spawn._enoent = crossSpawn._enoent as Enoent;
