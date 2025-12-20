import crossSpawn from './crossSpawn.ts';
import type { SpawnResult, SpawnSyncOptions } from './types.ts';
import worker from './workers/sync.ts';

export default function spawnSync(command: string, args: string[], options?: SpawnSyncOptions): SpawnResult {
  options = options || ({} as SpawnSyncOptions);
  const syncOptions = { ...options, env: options.env || process.env, stdio: 'pipe', encoding: options.encoding || 'utf8' };
  const res = crossSpawn.sync(command, args, syncOptions as SpawnSyncOptions);
  return worker(res, options);
}
spawnSync.worker = worker;
