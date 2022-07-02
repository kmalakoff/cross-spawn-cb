'use strict';
/* eslint-disable */

var path = require('path');
var fs = require('fs');
var tmpdir = require('os').tmpdir || require('os-shim').tmpdir;
var cp = require('child_process');
var JSON = require('json-buffer');
var sleep = require('thread-sleep-compat');
var mkdirp = require('mkdirp')
var suffix = require('temp-suffix')

function unlinkSafe(filename) {
  try {
    fs.unlinkSync(filename);
  } catch (e) {}
}

module.exports = function spawnSyncFallback(/*cmd, commandArgs, options*/) {
  var args = Array.prototype.slice.call(arguments, 0);

  // location to store arguments
  var temp = path.join(tmpdir(), 'ss');
  var input = path.join(temp , suffix("input"));
  var output = path.join(temp, suffix("output"));

  // store data to a file
  mkdirp.sync(path.dirname(input));
  fs.writeFileSync(input, JSON.stringify(args));
  unlinkSafe(output);

  var worker = path.normalize(__dirname + '/worker.js');
  cp.exec('"' + process.execPath + '" "' + worker + '" "' + input + '" "' + output + '"');
  while (!fs.existsSync(output)) {
    // busy wait
    sleep(200);
  }
  var res = JSON.parse(fs.readFileSync(output, 'utf8'));
  unlinkSafe(input);
  unlinkSafe(output);
  return res;
}
