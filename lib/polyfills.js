if (!Object.assign) Object.assign = require('just-extend');
if (!Object.keys) Object.keys = require('object-keys');

var path = require('path');
if (typeof path.delimiter === 'undefined') path.delimiter = process.platform === 'win32' ? ';' : ':';

var cp = require('child_process');
if (!cp.spawnSync) cp.spawnSync = require('./spawn-sync/spawn-sync.js');

if (!Array.prototype.find) {
  Array.prototype.find = function find(fn) {
    for (var i = 0; i < this.length; i++) {
      if (fn(this[i])) return this[i];
    }
    return null;
  };
}

if (!Buffer.from) {
  Buffer.from = function from(data) {
    // eslint-disable-next-line node/no-deprecated-api
    return new Buffer(data);
  };
}
if (!Buffer.alloc) Buffer.alloc = Buffer.from;
