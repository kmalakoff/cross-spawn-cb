const once = require('call-once-fn');
const nextTick = require('next-tick');
const constants = require('./constants');
const spawn = require('./spawn');

function worker(cp, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  callback = once(callback);

  // collect output
  const res = { stdout: null, stderr: null };
  if (options.encoding) {
    if (cp.stdout) {
      res.stdout = [];
      cp.stdout.on('data', res.stdout.push.bind(res.stdout));
    }
    if (cp.stderr) {
      res.stderr = [];
      cp.stderr.on('data', res.stderr.push.bind(res.stderr));
    }
  }

  // some versions of node emit both an error and close
  cp.on('error', function error(err) {
    err.code === 'OK' || callback(err);
  });

  // done
  cp.on('close', (status, signal) => {
    nextTick(function closeNextTick() {
      // prepare result
      res.pid = cp.pid;
      res.status = status;
      res.signal = signal;
      if (res.stdout) {
        res.stdout = Buffer.concat(res.stdout);
        if (options.encoding !== 'buffer') res.stdout = res.stdout.toString(options.encoding);
      }
      if (res.stderr) {
        res.stderr = Buffer.concat(res.stderr);
        if (options.encoding !== 'buffer') res.stderr = res.stderr.toString(options.encoding);
      }
      res.output = [null, res.stdout, res.stderr];

      // patch: early node on windows could return null
      if (res.status === null) res.status = 0;

      // process errors
      const err = res.status !== 0 ? new Error(`Non-zero exit code: ${res.status}`) : null;
      if (err) {
        for (const key in res) {
          if (constants.spawnKeys.indexOf(key) < 0) continue;
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

function spawnCallback(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  callback = once(callback);
  const cp = spawn(command, args, options);
  return worker(cp, options, callback);
}

module.exports = spawnCallback;
module.exports.worker = worker;
