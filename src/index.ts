import crossSpawn_ from './crossSpawn.cjs';

import asyncWorker from './workers/async';
import syncWorker from './workers/sync';

export type * from './types';

export function sync(command: string, args: string[], options?: SpawnOptions): SpawnResult {
  options = options || {};
  const syncOptions = { ...options, env: options.env || process.env, stdio: 'pipe', encoding: 'utf8' };
  const res = crossSpawn_.sync(command, args, syncOptions);
  return syncWorker(res, options as SpawnOptions);
}
sync.worker = syncWorker;

import type { SpawnCallback, SpawnOptions, SpawnResult } from './types';
export default function spawnCallback(command: string, args: string[], options?: SpawnOptions | SpawnCallback, callback?: SpawnCallback): undefined | Promise<SpawnResult> {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  const cp = crossSpawn_(command, args, options);

  if (typeof callback === 'function') return asyncWorker(cp, options, callback) as undefined;
  return new Promise((resolve, reject) => asyncWorker(cp, options, (err, res) => (err ? reject(err) : resolve(res))));
}
spawnCallback.worker = asyncWorker;
spawnCallback.sync = sync;
spawnCallback.crossSpawn = crossSpawn_;

export const crossSpawn = crossSpawn_;
