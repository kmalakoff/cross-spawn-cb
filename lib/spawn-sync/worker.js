'use strict';
/* eslint-disable */

require('../polyfills');

var spawn = require('../cross-spawn').spawn;
var fs = require('fs');
var JSON = require('json-buffer');

var input = process.argv[2];
var output = process.argv[3];

function writeOutput(result) {  
  fs.writeFile(output+'.tmp', JSON.stringify(result), function() {
    fs.rename(output+'.tmp', output, function() {
      process.exit(0)
    })
  });
}

fs.readFile(input, 'utf8', function(err, contents) {
  if (err) return output({ error: err.message });
  var args = JSON.parse(contents);

  var child = spawn.apply(null, args);
  var options = args[2] && typeof args[2] === 'object' ? args[2] : args[1] && typeof args[1] === 'object' && !Array.isArray(args[1]) ? args[1] : {};

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
  child.on('error', function (err) {
    writeOutput({ pid: child.pid, error: err.message });
  });
  child.on('close', function (status, signal) {
    if (stdout) stdout = Buffer.concat(stdout)
    if (stderr) stderr = Buffer.concat(stderr)

    if (options.encoding && options.encoding !== 'buffer') {
      stdout = stdout.toString(options.encoding);
      stderr = stderr.toString(options.encoding);
    }
    writeOutput({
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
})
