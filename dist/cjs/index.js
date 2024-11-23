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
        return _spawn.default;
    },
    sync: function() {
        return _spawnCallbackSync.default;
    }
});
require("./polyfills.js");
var _spawnCallback = /*#__PURE__*/ _interop_require_default(require("./spawnCallback"));
var _spawn = /*#__PURE__*/ _interop_require_default(require("./spawn"));
var _spawnCallbackSync = /*#__PURE__*/ _interop_require_default(require("./spawnCallbackSync"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var _default = _spawnCallback.default;
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }