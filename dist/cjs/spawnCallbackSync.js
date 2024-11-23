"use strict";
var constants = require("./constants");
var spawn = require("./spawn");
function normalize(res, options) {
    // patch: early node on windows could return null
    if (res.status === null) console.log("spawnCallbackSync null status code", res);
    // res.status = res.status === null ? 0 : res.status;
    // pipe if inherited
    if (res.stdout && (options.stdout === "inherit" || options.stdio === "inherit")) {
        process.stdout.write(res.stdout);
        res.stdout = null;
    }
    if (res.stderr && (options.stderr === "inherit" || options.stdio === "inherit")) {
        process.stderr.write(res.stderr);
        res.stderr = null;
    }
    // process errors
    var err = res.status !== 0 ? new Error("Non-zero exit code: ".concat(res.status)) : null;
    if (res.stderr && res.stderr.length) {
        err = err || new Error("stderr has content");
        for(var key in res){
            if (constants.spawnKeys.indexOf(key) < 0) continue;
            err[key] = Buffer.isBuffer(res[key]) ? res[key].toString("utf8") : res[key];
        }
    }
    if (err) throw err;
    return res;
}
function spawnCallbackSync(command, args, options) {
    options = options || {};
    var syncOptions = Object.assign({}, options || {}, {
        env: options.env || process.env,
        stdio: "pipe",
        encoding: "utf8"
    });
    var res = spawn.sync(command, args, syncOptions);
    return normalize(res, options);
}
module.exports = spawnCallbackSync;
module.exports.normalize = normalize;
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }