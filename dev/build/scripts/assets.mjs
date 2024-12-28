#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import url from 'url';
import spawn from 'cross-spawn-cb';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const src = path.join(__dirname, '..', 'src', 'index.cjs');
const dest = path.join(__dirname, '..', '..', '..', 'assets', 'cross-spawn-6.0.5.js');

function build(callback) {
  const config = path.resolve(__dirname, 'rollup.config.mjs');
  const args = ['rollup', '--config', config, '--input', src, '--file', dest];
  spawn(args[0], args.slice(1), { cwd: path.dirname(__dirname), stdio: 'inherit' }, (err) => {
    if (err) return callback(err);

    let contents = fs.readFileSync(dest, 'utf8');
    contents = contents.replace('Object.assign({}, options)', `require('core-js/actual/object/assign')({}, options)`);
    fs.writeFileSync(dest, contents, 'utf8');
    callback();
  });
}

build((err) => {
  !err || console.error(err);
});
