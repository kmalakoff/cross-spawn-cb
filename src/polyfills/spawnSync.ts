import Module from 'module';
import path from 'path';
import url from 'url';
import type { SpawnResult } from '../types.ts';

// CJS/ESM compatibility
const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));

// Path is relative to dist/cjs/polyfills/ at runtime
const workerPath = path.join(__dirname, '..', '..', 'cjs', 'spawn.js');

let functionExec = null; // break dependencies
export default function spawnSyncPolyfill(cmd: string, args: string[], options?: object): SpawnResult {
  if (!functionExec) functionExec = _require('function-exec-sync');
  return functionExec?.({ callbacks: true }, workerPath, cmd, args, options || {});
}
