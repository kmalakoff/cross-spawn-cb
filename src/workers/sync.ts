import { spawnKeys } from '../constants.js';

import type { SpawnOptions, SpawnResult } from '../types.js';

export default function worker(res: SpawnResult, options?: SpawnOptions): SpawnResult {
  options = options || {};

  // pipe if inherited
  if (res.stdout && options.stdio === 'inherit') {
    process.stdout.write(res.stdout);
    res.stdout = null;
  }
  if (res.stderr && options.stdio === 'inherit') {
    process.stderr.write(res.stderr);
    res.stderr = null;
  }
  if (res.status === null) res.status = 0; // patch: early node on windows could return null

  // process errors
  const err = res.status !== 0 ? new Error(`Non-zero exit code: ${res.status}`) : null;
  if (err) {
    for (const key in res) {
      if (spawnKeys.indexOf(key) < 0) continue;
      err[key] = Buffer.isBuffer(res[key]) ? res[key].toString(options.encoding || 'utf8') : res[key];
    }
    throw err;
  }
  return res;
}
