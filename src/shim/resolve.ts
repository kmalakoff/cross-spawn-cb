/**
 * Command resolution using which
 * Simplified from cross-spawn v6.0.5
 */

import envPathKey from 'env-path-key';
import path from 'path';
import which from 'which';
import { isWindows } from '../constants.ts';
import type { Parsed } from './types.ts';

const pathDelimiter = isWindows ? ';' : ':';
const NODES = ['node', 'node.exe', 'node.cmd'];

function resolveCommandAttempt(parsed: Parsed, withoutPathExt?: boolean): string | null {
  const command = parsed.command;
  const options = parsed.options;
  const env = options.env || process.env;
  const cwd = process.cwd();
  const hasCustomCwd = options.cwd != null;

  // Handle NODE/npm_node_execpath env vars for node commands
  // This is needed because shebang detection may change the command to 'node'
  // after the initial NODE env check in crossSpawn.ts has already passed
  if (NODES.indexOf(path.basename(command).toLowerCase()) >= 0) {
    const nodeFromEnv = env.NODE || env.npm_node_execpath;
    if (nodeFromEnv) {
      return nodeFromEnv;
    }
  }

  // If a custom cwd was specified, we need to change the process cwd
  // because which will do stat calls but does not support a custom cwd
  if (hasCustomCwd) {
    try {
      process.chdir(options.cwd as string);
    } catch (_err) {
      /* ignore */
    }
  }

  let resolved: string | null = null;
  const pathKey = envPathKey({ env: options.env || process.env }) || 'PATH';

  try {
    resolved = which.sync(command, {
      path: (options.env || process.env)[pathKey],
      // On Windows: undefined uses PATHEXT, pathDelimiter bypasses it
      // withoutPathExt fallback is needed to find files without extensions
      pathExt: withoutPathExt ? pathDelimiter : undefined,
    });
  } catch (_e) {
    /* not found */
  } finally {
    if (hasCustomCwd) {
      process.chdir(cwd);
    }
  }

  // Ensure absolute path
  if (resolved) {
    resolved = path.resolve(hasCustomCwd ? (options.cwd as string) : '', resolved);
  }

  return resolved;
}

// Try twice: first with PATHEXT (finds .cmd/.bat/.exe), then without (finds extensionless files)
export function resolveCommand(parsed: Parsed): string | null {
  return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}
