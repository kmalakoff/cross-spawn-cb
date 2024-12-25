#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import url from 'url';
import spawn from 'cross-spawn-cb';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const src = path.join(__dirname, '..', 'src', 'index.cjs');
const dest = path.join(__dirname, '..', '..', '..', 'assets', 'cross-spawn-6.0.5.js');

const PATCH = {}
PATCH.find = "var needsShell = !isExecutableRegExp.test(commandFile);";
PATCH.replace = `${PATCH.find}${['\n\n', '// KM: force node to use the shell\n', "if (!needsShell && ['node', 'node.exe', 'node.cmd'].indexOf(path.basename(commandFile).toLowerCase()) >= 0) needsShell = true;\n"].join('        ')}`

function build(callback) {
  const config = path.resolve(__dirname, 'rollup.config.mjs');
  const args = ['rollup', '--config', config, '--input', src, '--file', dest];
  spawn(args[0], args.slice(1), { cwd: path.dirname(__dirname), stdio: 'inherit' }, (err) => {
    if (err) return callback(err);

    // patch
    try {
      fs.writeFile(dest, fs.readFileSync(dest, 'utf8').replace(PATCH.find, PATCH.replace), 'utf8', callback);
    } catch (err) {
      callback(err)
    }
  });
}

build((err) => {
  !err || console.error(err);
});
