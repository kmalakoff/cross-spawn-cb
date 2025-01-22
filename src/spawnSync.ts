import crossSpawn from './crossSpawn.cjs';
import worker from './workers/sync';

import type { SpawnOptions, SpawnResult } from './types';

export default function spawnSync(command: string, args: string[], options?: SpawnOptions): SpawnResult {
  options = options || {};
  const syncOptions = { ...options, env: options.env || process.env, stdio: 'pipe', encoding: options.encoding || 'utf8' };
  const res = crossSpawn.sync(command, args, syncOptions);
  return worker(res, options as SpawnOptions);
}
spawnSync.worker = worker;
