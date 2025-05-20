import crossSpawn from './lib/crossSpawn.cjs';
import worker from './workers/sync.js';

import type { SpawnOptions, SpawnResult } from './types.js';

export default function spawnSync(command: string, args: string[], options?: SpawnOptions): SpawnResult {
  options = options || {};
  const syncOptions = { ...options, env: options.env || process.env, stdio: 'pipe', encoding: options.encoding || 'utf8' };
  const res = crossSpawn.sync(command, args, syncOptions);
  return worker(res, options as SpawnOptions);
}
spawnSync.worker = worker;
