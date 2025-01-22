#!/usr/bin/env node

import path from 'path';
import url from 'url';
import spawn from 'cross-spawn-cb';
import Queue from 'queue-cb';
import resolve from 'resolve';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const cwd = process.cwd();
const dest = path.join(__dirname, '..', '..', '..', 'assets');

// https://github.com/sindresorhus/escape-string-regexp/blob/main/index.js#L8C1-L11C1
function escape(string) {
  return string
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d');
}

const BUILDS = [
  {
    in: 'cross-spawn-6.0.5',
    out: 'cross-spawn.cjs',
    pre: path.join(__dirname, '..', 'assets', 'pre.js'),
    post: path.join(__dirname, '..', 'assets', 'post.js'),
    replacements: [
      { from: escape('Object.assign'), to: 'objectAssign' },
      { from: escape('Object.keys(env).find('), to: 'findKey(env,' },
      { from: escape('path.delimiter'), to: 'pathDelimiter' },
    ]
  }
];

import fs from 'fs';
function patch(build, callback) {
  try {
    const outPath = path.join(dest, build.out);
    const pre = build.pre ? fs.readFileSync(build.pre, 'utf8') : '';
    const post = build.post ? fs.readFileSync(build.post, 'utf8') : '';
    let content = fs.readFileSync(outPath, 'utf8');
    if (build.replacements) content = build.replacements.reduce((m, r) => m.replace(new RegExp(r.from, 'g'), r.to), content)
    fs.writeFileSync(outPath, pre + content + post, 'utf8');
    callback();
  } catch (err) {
    callback(err);
  }
}

function build(callback) {
  const config = path.join(__dirname, 'rollup.config.mjs');
  const queue = new Queue();
  BUILDS.forEach(build => {
    const args = ['--config', config, '--input', resolve.sync(build.in), '--file', path.join(dest, build.out)];
    queue.defer((cb) => spawn('rollup', args, { cwd: cwd, stdio: 'inherit' }, (err) => err ? cb(err) : patch(build, cb)))
  })
  queue.await(callback)
}

build((err) => {
  !err || console.error(err);
});