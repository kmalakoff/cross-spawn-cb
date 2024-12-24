#!/usr/bin/env node

import path from 'path';
import url from 'url';
import spawn from 'cross-spawn-cb';
import resolve from 'resolve';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const src = resolve.sync('cross-spawn');
const dest = path.join(__dirname, '..', '..', '..', 'assets', 'cross-spawn-6.0.5.cjs');

function build(callback) {
  const config = path.resolve(__dirname, 'rollup.config.mjs');
  const args = ['rollup', '--config', config, '--input', src, '--file', dest];
  spawn(args[0], args.slice(1), { cwd: path.dirname(__dirname), stdio: 'inherit' }, callback);
}

build((err) => {
  !err || console.error(err);
});