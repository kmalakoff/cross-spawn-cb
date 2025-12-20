import crossSpawn from './crossSpawn.ts';
import spawnSync from './spawnSync.ts';
import type { SpawnCallback, SpawnOptions, SpawnResult } from './types.ts';
import worker from './workers/async.ts';

function spawn(command: string, args: string[], callback: SpawnCallback): void;
function spawn(command: string, args: string[], options: SpawnOptions, callback: SpawnCallback): void;
function spawn(command: string, args: string[], options?: SpawnOptions): Promise<SpawnResult>;
function spawn(command: string, args: string[], options?: SpawnOptions | SpawnCallback, callback?: SpawnCallback): void | Promise<SpawnResult> {
  callback = typeof options === 'function' ? options : callback;
  options = typeof options === 'function' ? {} : ((options || {}) as SpawnOptions);
  const cp = crossSpawn(command, args, options);

  if (typeof callback === 'function') return worker(cp, options, callback);
  return new Promise((resolve, reject) => worker(cp, options, (err, res) => (err ? reject(err) : resolve(res))));
}
spawn.worker = worker;
spawn.sync = spawnSync;
spawn.crossSpawn = crossSpawn;

export default spawn;
