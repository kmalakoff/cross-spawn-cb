"use strict";
require("./polyfills");
module.exports = require("./spawnCallback");
module.exports.spawn = require("./spawnCallback");
module.exports.sync = require("./spawnSyncCallback");

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  for (var key in exports) exports.default[key] = exports[key];
  module.exports = exports.default;
}