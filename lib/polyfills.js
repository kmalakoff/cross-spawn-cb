require('core-js/actual/object/assign');
require('core-js/actual/object/keys');
require('core-js/actual/array/find');
require('buffer-v6-polyfill');

var path = require('path');
if (!path.delimiter) path.delimiter = process.platform === 'win32' ? ';' : ':';

var cp = require('child_process');
if (!cp.spawnSync) cp.spawnSync = require('./spawn-sync');
