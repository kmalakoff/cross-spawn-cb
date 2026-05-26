import { spawnKeys } from '../constants.ts';

import type { SpawnOptions, SpawnResult } from '../types.ts';

export default function worker(res: SpawnResult, options?: SpawnOptions): SpawnResult {
  options = options || {};

  // pipe if inherited
  if (res.stdout && options.stdio === 'inherit') {
    process.stdout.write(res.stdout);
    (res as unknown as Record<string, unknown>).stdout = null as unknown as string | Buffer;
  }
  if (res.stderr && options.stdio === 'inherit') {
    process.stderr.write(res.stderr);
    (res as unknown as Record<string, unknown>).stderr = null as unknown as string | Buffer;
  }
  if (res.status === null) res.status = 0; // patch: early node on windows could return null

  // process errors
  const err = res.status !== 0 ? new Error(`Non-zero exit code: ${res.status}`) : null;
  if (err) {
    for (const key in res) {
      if (spawnKeys.indexOf(key) < 0) continue;
      (err as unknown as Record<string, unknown>)[key] = Buffer.isBuffer((res as unknown as Record<string, unknown>)[key]) ? ((res as unknown as Record<string, unknown>)[key] as Buffer).toString(options.encoding || 'utf8') : (res as unknown as Record<string, unknown>)[key];
    }
    throw err;
  }
  return res;
}
