require('core-js/actual/object/assign');
require('core-js/actual/object/keys');
require('core-js/actual/array/find');

var path = require('path');
if (typeof path.delimiter === 'undefined') path.delimiter = process.platform === 'win32' ? ';' : ':';

if (!Buffer.from) {
  Buffer.from = function from(data) {
    // eslint-disable-next-line n/no-deprecated-api
    return new Buffer(data);
  };
}
if (!Buffer.alloc) Buffer.alloc = Buffer.from;

var cp = require('child_process')
if (!cp.spawnSync) cp.spawnSync = require('./spawn-sync/spawn-sync.js');
