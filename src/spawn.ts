import crossSpawn from './crossSpawn.ts';
import spawnSync from './spawnSync.ts';
import type { SpawnCallback, SpawnOptions, SpawnResult } from './types.ts';
import worker from './workers/async.ts';

export default function spawn(command: string, args: string[], options?: SpawnOptions | SpawnCallback, callback?: SpawnCallback): undefined | Promise<SpawnResult> {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  const cp = crossSpawn(command, args, options);

  if (typeof callback === 'function') return worker(cp, options, callback) as undefined;
  return new Promise((resolve, reject) => worker(cp, options, (err, res) => (err ? reject(err) : resolve(res))));
}
spawn.worker = worker;
spawn.sync = spawnSync;
spawn.crossSpawn = crossSpawn;
