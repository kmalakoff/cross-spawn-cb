/**
 * Minimal cross-spawn shim for Windows compatibility on legacy Node.js
 *
 * This replaces the bundled cross-spawn v6.0.5 (~1,950 lines) with a minimal
 * implementation (~200 lines) that uses external dependencies:
 * - which@^1.0.0 (command resolution)
 * - env-path-key@^1.0.0 (cross-platform PATH key detection)
 */

import type { ChildProcess, SpawnSyncReturns } from 'child_process';
import cp from 'child_process';
import { hookChildProcess, notFoundError, verifyENOENT, verifyENOENTSync } from './enoent.ts';
import { parse } from './parse.ts';
import spawnSyncCompat from './spawnSync.ts';
import type { Parsed, ShimSpawnOptions } from './types.ts';

function spawn(command: string, args?: string[] | ShimSpawnOptions, options?: ShimSpawnOptions): ChildProcess {
  const parsed = parse(command, args, options);
  const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
  hookChildProcess(spawned, parsed);
  return spawned;
}

function spawnSync(command: string, args?: string[] | ShimSpawnOptions, options?: ShimSpawnOptions): SpawnSyncReturns<Buffer> {
  const parsed = parse(command, args, options);
  const result = spawnSyncCompat(parsed.command, parsed.args, parsed.options) as SpawnSyncReturns<Buffer> & { error?: Error };
  result.error = result.error || verifyENOENTSync(result.status as number, parsed);
  return result;
}

// Main export
export default spawn;

// Named exports matching cross-spawn's API
export { spawn };
export { spawnSync as sync };

// Internal APIs used by crossSpawn.ts
export { parse as _parse };
export const _enoent = {
  hookChildProcess,
  verifyENOENT,
  verifyENOENTSync,
  notFoundError,
};

// Re-export types
export type { Parsed, ShimSpawnOptions };
