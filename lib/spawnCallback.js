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
  var stdout, stderr;
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
  cp.on('error', function error(err) {
    err.code === 'OK' || callback(err);
  });

  // done
  cp.on('close', function (status, signal) {
    nextTick(function closeNextTick() {
      // process output
      if (options.encoding) {
        stdout = Buffer.concat(stdout);
        stderr = Buffer.concat(stderr);

        if (options.encoding !== 'buffer') {
          stdout = stdout.toString(options.encoding);
          stderr = stderr.toString(options.encoding);
        }
      }

      // process errors
      var err = status !== 0 ? new Error('Non-zero exit code: ' + status) : null;
      if (stderr && stderr.length) {
        err = err || new Error('stderr has content');
        err.stderr = Buffer.isBuffer(stderr) ? stderr.toString('utf8') : stderr;
      }
      if (err) return callback(err);

      // non error result
      callback(null, {
        pid: cp.pid,
        output: [null, stdout, stderr],
        stdout: stdout,
        stderr: stderr,
        status: status,
        signal: signal,
      });
    });
  });

  // pipe input
  if (options.input && (typeof options.input === 'string' || Buffer.isBuffer(options.input))) {
    cp.stdin.end(options.input);
  }
};
