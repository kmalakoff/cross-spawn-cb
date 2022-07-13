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
  var stdout, stderr;
  if (cp.stdout) {
    stdout = [];
    cp.stdout.on('data', stdout.push.bind(stdout));
  }
  if (cp.stderr) {
    stderr = [];
    cp.stderr.on('data', stderr.push.bind(stderr));
  }
  cp.on('error', function error(err) {
    // some versions of node emit both an error and close
    err.code === 'OK' || callback(err);
  });
  cp.on('close', function (status, signal) {
    nextTick(function closeNextTick() {
      // format results - buffer
      if (stdout) stdout = Buffer.concat(stdout);
      if (stderr) stderr = Buffer.concat(stderr);

      // format results - string
      var encoding = options.encoding === 'buffer' ? 'utf8' : options.encoding || 'utf8';
      if ((options.encoding && options.encoding !== 'buffer') || options.stdio === 'string') {
        stdout = stdout.toString(encoding);
        stderr = stderr.toString(encoding);
      } else if (options.stdout === 'string') {
        stdout = stdout.toString(encoding);
      } else if (options.stderr === 'string') {
        stderr = stderr.toString(encoding);
      }

      // process errors
      var err = status !== 0 ? new Error('Non-zero exit code: ' + status) : null;
      if (stderr && stderr.length) {
        err = err || new Error('stderr has content');
        err.stderr = stderr;
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
