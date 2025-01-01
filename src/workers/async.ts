import once from 'call-once-fn';
import nextTick from 'next-tick';
import { spawnKeys } from '../constants';

import type { ChildProcess, SpawnCallback, SpawnError, SpawnOptions, SpawnResult } from '../types';

export default function worker(cp: ChildProcess, options?: SpawnOptions | SpawnCallback, callback?: SpawnCallback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  callback = once(callback);
  let stdout: Buffer[] = null;
  let stderr: Buffer[] = null;

  // collect output
  const res = { stdout: null, stderr: null } as SpawnResult;
  if (options.encoding) {
    if (cp.stdout) {
      stdout = [];
      cp.stdout.on('data', stdout.push.bind(stdout));
    }
    if (cp.stderr) {
      stderr = [];
      cp.stderr.on('data', stderr.push.bind(stderr));
    }
  }

  // some versions of node emit both an error and close
  cp.on('error', (err: SpawnError) => err.code === 'OK' || callback(err));

  // done
  cp.on('close', (status, signal) => {
    nextTick(function closeNextTick() {
      // prepare result
      res.pid = cp.pid;
      res.status = status;
      res.signal = signal;
      if (stdout) {
        res.stdout = Buffer.concat(stdout);
        if (options.encoding !== 'binary') res.stdout = res.stdout.toString(options.encoding);
      }
      if (stderr) {
        res.stderr = Buffer.concat(stderr);
        if (options.encoding !== 'binary') res.stderr = res.stderr.toString(options.encoding);
      }
      res.output = [null, res.stdout, res.stderr];

      // patch: early node on windows could return null
      if (res.status === null) res.status = 0;

      // process errors
      const err = res.status !== 0 ? new Error(`Non-zero exit code: ${res.status}`) : null;
      if (err) {
        for (const key in res) {
          if (spawnKeys.indexOf(key) < 0) continue;
          err[key] = Buffer.isBuffer(res[key]) ? res[key].toString('utf8') : res[key];
        }
      }
      err ? callback(err) : callback(null, res);
    });
  });

  // pipe input
  if (options.input && (typeof options.input === 'string' || Buffer.isBuffer(options.input))) {
    cp.stdin.end(options.input);
  }
}
