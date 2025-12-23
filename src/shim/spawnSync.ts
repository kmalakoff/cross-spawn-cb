import cp from 'child_process';
import { bindSync } from 'node-version-call-local';
import path from 'path';
import url from 'url';
import type { SpawnOptions, SpawnResult } from '../types.ts';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const workerPath = path.join(__dirname, '..', '..', 'cjs', 'spawn.js');

function run(cmd: string, args: string[], options?: object): SpawnResult {
  return cp.spawnSync(cmd, args, options) as SpawnResult;
}

type spawnSyncFunction = (cmd: string, args: string[], options?: object) => SpawnResult;

const worker = (typeof cp.spawnSync === 'function' ? run : bindSync(process.version, workerPath, { callbacks: true })) as spawnSyncFunction;

export default function spawnSync(cmd: string, args: string[], options?: SpawnOptions): SpawnResult {
  return worker(cmd, args, options || {}) as SpawnResult;
}
