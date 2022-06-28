if (!Object.assign) Object.assign = require('just-extend');

var path = require('path');
if (typeof path.delimiter === 'undefined') path.delimiter = process.platform === 'win32' ? ';' : ':';

var cp = require('child_process');
if (!cp.spawnSync) cp.spawnSync = require('./spawn-sync/spawn-sync.js');
