"use strict";
require('core-js/actual/object/assign');
require('core-js/actual/object/keys');
require('core-js/actual/array/find');
require('buffer-v6-polyfill');
var path = require('path');
if (!path.delimiter) {
    var isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
    path.delimiter = isWindows ? ';' : ':';
}
var cp = require('child_process');
if (!cp.spawnSync) {
    var spawnCallback = path.join(__dirname, 'spawnCallback.js');
    var functionExec = null; // break dependencies
    cp.spawnSync = function spawnSyncPolyfill(cmd, args, options) {
        if (!functionExec) functionExec = require('function-exec-sync');
        return functionExec({
            callbacks: true
        }, spawnCallback, cmd, args, options || {});
    };
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }