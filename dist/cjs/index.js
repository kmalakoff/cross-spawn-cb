"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    spawn: function() {
        return _spawnCallback.default;
    },
    sync: function() {
        return _spawnSyncCallback.default;
    }
});
require("./polyfills.js");
var _spawnCallback = /*#__PURE__*/ _interop_require_default(require("./spawnCallback"));
var _spawnSyncCallback = /*#__PURE__*/ _interop_require_default(require("./spawnSyncCallback"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var _default = _spawnCallback.default;
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }