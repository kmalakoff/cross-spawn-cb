"use strict";
var major = +process.versions.node.split('.')[0];
var spawn = major <= 7 ? require('../../assets/cross-spawn-6.0.5.js').spawn : require('cross-spawn').spawn;
module.exports = spawn;
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }