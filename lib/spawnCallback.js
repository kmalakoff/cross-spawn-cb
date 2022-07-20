var once = require('once');
var nextTick = require('next-tick');

var major = +process.versions.node.split('.')[0];
var spawn = major < 8 ? require('./cross-spawn-3.0.1').spawn : require('cross-spawn').spawn;

module.exports = function spawnCallback(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  callback = once(callback);

  var cp = spawn(command, args, options);

  // collect output
  var res = { stdout: null, stderr: null };
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
  cp.on('close', function (status, signal) {
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
      res.stdio = [null, res.stdout, res.stderr];

      // process errors
      var err = res.status !== 0 ? new Error('Non-zero exit code: ' + res.status) : null;
      if (res.stderr && res.stderr.length) {
        err = err || new Error('stderr has content');
        for (var key in res) {
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
};
