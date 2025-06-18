import crossSpawn from './crossSpawn.js';
import type { SpawnOptions, SpawnResult, SpawnSyncOptions } from './types.js';
import worker from './workers/sync.js';

export default function spawnSync(command: string, args: string[], options?: SpawnSyncOptions): SpawnResult {
  options = options || {};
  const syncOptions = { ...options, env: options.env || process.env, stdio: 'pipe', encoding: options.encoding || 'utf8' };
  const res = crossSpawn.sync(command, args, syncOptions as SpawnSyncOptions);
  return worker(res, options as SpawnOptions);
}
spawnSync.worker = worker;
