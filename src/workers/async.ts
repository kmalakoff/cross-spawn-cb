import once from 'call-once-fn';
import { spawnKeys } from '../constants';

import type { ChildProcess, SpawnCallback, SpawnError, SpawnOptions, SpawnResult } from '../types';

export default function worker(cp: ChildProcess, options?: SpawnOptions | SpawnCallback, callback?: SpawnCallback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  callback = once(callback); // some versions of node emit both an error and close

  // collect output
  const res = { pid: 0, output: [], stdout: null, stderr: null, status: null, signal: null } as SpawnResult;
  const stdout: Buffer[] = [];
  const stderr: Buffer[] = [];
  if (options.encoding && cp.stdout) cp.stdout.on('data', stdout.push.bind(stdout));
  if (options.encoding && cp.stderr) cp.stderr.on('data', stderr.push.bind(stderr));

  cp.on('error', (err: SpawnError) => err.code === 'OK' || callback(err));
  cp.on('close', (status, signal) => {
    setTimeout(function close() {
      // prepare result
      res.pid = cp.pid;
      res.status = status;
      res.signal = signal;
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
      const err = res.status !== 0 ? new Error(`Non-zero exit code: ${res.status}`) : null;
      if (err) {
        for (const key in res) {
          if (spawnKeys.indexOf(key) < 0) continue;
          err[key] = Buffer.isBuffer(res[key]) ? res[key].toString(options.encoding || 'utf8') : res[key];
        }
      }
      err ? callback(err) : callback(null, res);
    }, 0);
  });

  // pipe input
  if (options.input && (typeof options.input === 'string' || Buffer.isBuffer(options.input))) {
    cp.stdin.end(options.input);
  }
}
