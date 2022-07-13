var once = require('once');
var spawn = require('../cross-spawn-3.0.1').spawn;

module.exports = function worker(command, args, options, callback) {
  callback = once(callback);
  var child = spawn(command, args, options);

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
  child.on('error', callback);
  child.on('close', function (status, signal) {
    if (stdout) stdout = Buffer.concat(stdout)
    if (stderr) stderr = Buffer.concat(stderr)

    if (options.encoding && options.encoding !== 'buffer') {
      stdout = stdout.toString(options.encoding);
      stderr = stderr.toString(options.encoding);
    }
    callback(null, {
      pid: child.pid,
      output: [null, stdout, stderr],
      stdout: stdout,
      stderr: stderr,
      status: status,
      signal: signal,
    });
  });

  if (options.input && (typeof options.input === 'string' || Buffer.isBuffer(options.input))) {
    child.stdin.end(options.input);
  }
}
