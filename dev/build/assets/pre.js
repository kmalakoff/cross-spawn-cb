'use strict';

/* COMPATIBILITY POLYFILLS */

function objectAssign(target) {
  var objects = Array.prototype.slice.call(arguments, 1);
  while (objects.length) {
    var object = objects.pop();
    for (var key in object) {
      target[key] = object[key];
    }
  }
  return target;
}

function findKey(obj, fn) {
  for (var key in obj) {
    if (fn(key)) return key;
  }
  return null
}

var pathDelimiter = process.platform === 'win32' ? ';' : ':';

var cpSpawnSync = require('child_process').spawnSync || require('../dist/cjs/polyfills/spawnSync.cjs');

/* COMPATIBILITY POLYFILLS */
