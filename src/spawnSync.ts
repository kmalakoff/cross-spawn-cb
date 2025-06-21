import crossSpawn from './crossSpawn.ts';
import type { SpawnOptions, SpawnResult, SpawnSyncOptions } from './types.ts';
import worker from './workers/sync.ts';

export default function spawnSync(command: string, args: string[], options?: SpawnSyncOptions): SpawnResult {
  options = options || {};
  const syncOptions = { ...options, env: options.env || process.env, stdio: 'pipe', encoding: options.encoding || 'utf8' };
  const res = crossSpawn.sync(command, args, syncOptions as SpawnSyncOptions);
  return worker(res, options as SpawnOptions);
}
spawnSync.worker = worker;
