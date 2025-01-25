#!/usr/bin/env node

import path from 'path';
import url from 'url';
import spawn from 'cross-spawn-cb';
import Queue from 'queue-cb';
import resolve from 'resolve';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const cwd = process.cwd();
const dest = path.join(__dirname, '..', '..', '..', 'assets');

const BUILDS = [{
  in: 'cross-spawn-6.0.5',
  out: 'cross-spawn.cjs',
  pre: path.join(__dirname, '..', 'assets', 'pre.js'),
  post: path.join(__dirname, '..', 'assets', 'post.js')
}];

import fs from 'fs';
function patch(build, callback) {
  try {
    const outPath = path.join(dest, build.out);
    const pre = build.pre ? fs.readFileSync(build.pre, 'utf8') : '';
    const post = build.post ? fs.readFileSync(build.post, 'utf8') : '';
    let content = fs.readFileSync(outPath, 'utf8');
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