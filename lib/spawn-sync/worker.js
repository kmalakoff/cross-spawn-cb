require('../polyfills');

var spawn = require('../cross-spawn').spawn;

module.exports = function worker(cmd, args, options, cb) {
  var child = spawn(cmd, args, options);

  var stdout, stderr;
  if (child.stdout) {
    stdout = [];
    child.stdout.on('data', function(chunk) {
      stdout.push(chunk);
    })
  }
  if (child.stderr) {
    stderr = [];
    child.stderr.on('data', function(chunk) {
      stderr.push(chunk);
    })
  }
  child.on('error', cb);
  child.on('close', function (status, signal) {
    if (stdout) stdout = Buffer.concat(stdout)
    if (stderr) stderr = Buffer.concat(stderr)

    if (options.encoding && options.encoding !== 'buffer') {
      stdout = stdout.toString(options.encoding);
      stderr = stderr.toString(options.encoding);
    }

    cb(null, {
      pid: child.pid,
      output: [null, stdout, stderr],
      stdout: stdout,
      stderr: stderr,
      status: status,
      signal: signal,
    });
  });

  if (options.timeout && typeof options.timeout === 'number') {
    setTimeout(function () {
      child.kill(options.killSignal || 'SIGTERM');
    }, options.timeout);
  }
  if (options.input && (typeof options.input === 'string' || Buffer.isBuffer(options.input))) {
    child.stdin.end(options.input);
  }
}
