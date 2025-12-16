/**
 * ENOENT error handling for Windows
 * Extracted from cross-spawn v6.0.5
 */

import type { ChildProcess } from 'child_process';
import { isWindows } from '../constants.ts';
import type { ENOENTError, Parsed } from './types.ts';

export function notFoundError(original: Parsed['original'], syscall: string): ENOENTError {
  const err = new Error(`${syscall} ${original.command} ENOENT`) as ENOENTError;
  err.code = 'ENOENT';
  err.errno = 'ENOENT';
  err.syscall = `${syscall} ${original.command}`;
  err.path = original.command;
  err.spawnargs = original.args;
  return err;
}

export function hookChildProcess(cp: ChildProcess, parsed: Parsed): void {
  if (!isWindows) return;

  const originalEmit = cp.emit.bind(cp);
  cp.emit = (name: string | symbol, ...args: unknown[]): boolean => {
    if (name === 'exit') {
      const err = verifyENOENT(args[0] as number, parsed);
      if (err) {
        return originalEmit('error', err);
      }
    }
    return originalEmit(name, ...args);
  };
}

export function verifyENOENT(status: number, parsed: Parsed): ENOENTError | null {
  if (isWindows && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, 'spawn');
  }
  return null;
}

export function verifyENOENTSync(status: number, parsed: Parsed): ENOENTError | null {
  if (isWindows && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, 'spawnSync');
  }
  return null;
}
