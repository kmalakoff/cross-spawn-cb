import oo from 'on-one';
import { spawnKeys } from '../constants.ts';

import type { ChildProcess, SpawnCallback, SpawnError, SpawnOptions, SpawnResult } from '../types.ts';

export default function worker(cp: ChildProcess, options?: SpawnOptions | SpawnCallback, callback?: SpawnCallback): void {
  callback = typeof options === 'function' ? options : callback;
  options = typeof options === 'function' ? {} : ((options || {}) as SpawnOptions);

  // collect output
  const res = { pid: 0, output: [], stdout: null, stderr: null, status: null, signal: null } as unknown as SpawnResult;
  const stdout: Buffer[] = [];
  const stderr: Buffer[] = [];
  if (options.encoding && cp.stdout) cp.stdout.on('data', stdout.push.bind(stdout));
  if (options.encoding && cp.stderr) cp.stderr.on('data', stderr.push.bind(stderr));

  // some versions of node emit both an error and close
  oo(cp, ['error', 'close'], function (this: unknown, ...args: unknown[]) {
    const err = args[0] as Error | null;
    if (err) {
      if ((err as SpawnError).code === 'OK') return; // ignore
      return callback?.(err as SpawnError);
    }

    // prepare result
    res.pid = cp.pid ?? 0;
    res.status = args[1] as number | null;
    res.signal = args[2] as NodeJS.Signals | null;
    if (options.encoding && cp.stdout) {
      res.stdout = Buffer.concat(stdout);
      if (options.encoding !== 'binary') res.stdout = res.stdout.toString(options.encoding);
    }
    if (options.encoding && cp.stderr) {
      res.stderr = Buffer.concat(stderr);
      if (options.encoding !== 'binary') res.stderr = res.stderr.toString(options.encoding);
    }
    res.output = [null, res.stdout, res.stderr];
    if (res.status === null) res.status = 0; // patch: early node on windows could return null

    // process errors
    const exitErr = res.status !== 0 ? new Error(`Non-zero exit code: ${res.status}`) : null;
    if (exitErr) {
      for (const key in res) {
        if (spawnKeys.indexOf(key) < 0) continue;
        (exitErr as unknown as Record<string, unknown>)[key] = Buffer.isBuffer((res as unknown as Record<string, unknown>)[key]) ? ((res as unknown as Record<string, unknown>)[key] as Buffer).toString(options.encoding || 'utf8') : (res as unknown as Record<string, unknown>)[key];
      }
    }
    exitErr ? callback?.(exitErr as SpawnError) : callback?.(undefined, res);
  });

  // pipe input
  if (options.input && (typeof options.input === 'string' || Buffer.isBuffer(options.input))) {
    cp.stdin?.end(options.input);
  }
}
