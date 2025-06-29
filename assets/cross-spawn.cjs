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
var require$$0$2 = require('child_process');
var require$$0$1 = require('path');
var require$$0 = require('fs');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var crossSpawn6_0_5 = {
    exports: {}
};

var src;
var hasRequiredSrc;
function requireSrc() {
    if (hasRequiredSrc) return src;
    hasRequiredSrc = 1;
    /**
	 * Tries to execute a function and discards any error that occurs.
	 * @param {Function} fn - Function that might or might not throw an error.
	 * @returns {?*} Return-value of the function when no error occurred.
	 */ src = function src(fn) {
        try {
            return fn();
        } catch (e) {}
    };
    return src;
}

var windows;
var hasRequiredWindows;
function requireWindows() {
    if (hasRequiredWindows) return windows;
    hasRequiredWindows = 1;
    windows = isexe;
    isexe.sync = sync;
    var fs = require$$0;
    function checkPathExt(path, options) {
        var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;
        if (!pathext) {
            return true;
        }
        pathext = pathext.split(';');
        if (pathext.indexOf('') !== -1) {
            return true;
        }
        for(var i = 0; i < pathext.length; i++){
            var p = pathext[i].toLowerCase();
            if (p && path.substr(-p.length).toLowerCase() === p) {
                return true;
            }
        }
        return false;
    }
    function checkStat(stat, path, options) {
        if (!stat.isSymbolicLink() && !stat.isFile()) {
            return false;
        }
        return checkPathExt(path, options);
    }
    function isexe(path, options, cb) {
        fs.stat(path, function(er, stat) {
            cb(er, er ? false : checkStat(stat, path, options));
        });
    }
    function sync(path, options) {
        return checkStat(fs.statSync(path), path, options);
    }
    return windows;
}

var mode;
var hasRequiredMode;
function requireMode() {
    if (hasRequiredMode) return mode;
    hasRequiredMode = 1;
    mode = isexe;
    isexe.sync = sync;
    var fs = require$$0;
    function isexe(path, options, cb) {
        fs.stat(path, function(er, stat) {
            cb(er, er ? false : checkStat(stat, options));
        });
    }
    function sync(path, options) {
        return checkStat(fs.statSync(path), options);
    }
    function checkStat(stat, options) {
        return stat.isFile() && checkMode(stat, options);
    }
    function checkMode(stat, options) {
        var mod = stat.mode;
        var uid = stat.uid;
        var gid = stat.gid;
        var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
        var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();
        var u = parseInt('100', 8);
        var g = parseInt('010', 8);
        var o = parseInt('001', 8);
        var ug = u | g;
        var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
        return ret;
    }
    return mode;
}

var isexe_1;
var hasRequiredIsexe;
function requireIsexe() {
    if (hasRequiredIsexe) return isexe_1;
    hasRequiredIsexe = 1;
    var core;
    if (process.platform === 'win32' || commonjsGlobal.TESTING_WINDOWS) {
        core = requireWindows();
    } else {
        core = requireMode();
    }
    isexe_1 = isexe;
    isexe.sync = sync;
    function isexe(path, options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = {};
        }
        if (!cb) {
            if (typeof Promise !== 'function') {
                throw new TypeError('callback not provided');
            }
            return new Promise(function(resolve, reject) {
                isexe(path, options || {}, function(er, is) {
                    if (er) {
                        reject(er);
                    } else {
                        resolve(is);
                    }
                });
            });
        }
        core(path, options || {}, function(er, is) {
            // ignore EACCES because that just means we aren't allowed to run it
            if (er) {
                if (er.code === 'EACCES' || options && options.ignoreErrors) {
                    er = null;
                    is = false;
                }
            }
            cb(er, is);
        });
    }
    function sync(path, options) {
        // my kingdom for a filtered catch
        try {
            return core.sync(path, options || {});
        } catch (er) {
            if (options && options.ignoreErrors || er.code === 'EACCES') {
                return false;
            } else {
                throw er;
            }
        }
    }
    return isexe_1;
}

var which_1;
var hasRequiredWhich;
function requireWhich() {
    if (hasRequiredWhich) return which_1;
    hasRequiredWhich = 1;
    which_1 = which;
    which.sync = whichSync;
    var isWindows = process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys';
    var path = require$$0$1;
    var COLON = isWindows ? ';' : ':';
    var isexe = requireIsexe();
    function getNotFoundError(cmd) {
        var er = new Error('not found: ' + cmd);
        er.code = 'ENOENT';
        return er;
    }
    function getPathInfo(cmd, opt) {
        var colon = opt.colon || COLON;
        var pathEnv = opt.path || process.env.PATH || '';
        var pathExt = [
            ''
        ];
        pathEnv = pathEnv.split(colon);
        var pathExtExe = '';
        if (isWindows) {
            pathEnv.unshift(process.cwd());
            pathExtExe = opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM';
            pathExt = pathExtExe.split(colon);
            // Always test the cmd itself first.  isexe will check to make sure
            // it's found in the pathExt set.
            if (cmd.indexOf('.') !== -1 && pathExt[0] !== '') pathExt.unshift('');
        }
        // If it has a slash, then we don't bother searching the pathenv.
        // just check the file itself, and that's it.
        if (cmd.match(/\//) || isWindows && cmd.match(/\\/)) pathEnv = [
            ''
        ];
        return {
            env: pathEnv,
            ext: pathExt,
            extExe: pathExtExe
        };
    }
    function which(cmd, opt, cb) {
        if (typeof opt === 'function') {
            cb = opt;
            opt = {};
        }
        var info = getPathInfo(cmd, opt);
        var pathEnv = info.env;
        var pathExt = info.ext;
        var pathExtExe = info.extExe;
        var found = [];
        (function F(i, l) {
            if (i === l) {
                if (opt.all && found.length) return cb(null, found);
                else return cb(getNotFoundError(cmd));
            }
            var pathPart = pathEnv[i];
            if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);
            var p = path.join(pathPart, cmd);
            if (!pathPart && /^\.[\\\/]/.test(cmd)) {
                p = cmd.slice(0, 2) + p;
            }
            (function E(ii, ll) {
                if (ii === ll) return F(i + 1, l);
                var ext = pathExt[ii];
                isexe(p + ext, {
                    pathExt: pathExtExe
                }, function(er, is) {
                    if (!er && is) {
                        if (opt.all) found.push(p + ext);
                        else return cb(null, p + ext);
                    }
                    return E(ii + 1, ll);
                });
            })(0, pathExt.length);
        })(0, pathEnv.length);
    }
    function whichSync(cmd, opt) {
        opt = opt || {};
        var info = getPathInfo(cmd, opt);
        var pathEnv = info.env;
        var pathExt = info.ext;
        var pathExtExe = info.extExe;
        var found = [];
        for(var i = 0, l = pathEnv.length; i < l; i++){
            var pathPart = pathEnv[i];
            if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);
            var p = path.join(pathPart, cmd);
            if (!pathPart && /^\.[\\\/]/.test(cmd)) {
                p = cmd.slice(0, 2) + p;
            }
            for(var j = 0, ll = pathExt.length; j < ll; j++){
                var cur = p + pathExt[j];
                var is;
                try {
                    is = isexe.sync(cur, {
                        pathExt: pathExtExe
                    });
                    if (is) {
                        if (opt.all) found.push(cur);
                        else return cur;
                    }
                } catch (ex) {}
            }
        }
        if (opt.all && found.length) return found;
        if (opt.nothrow) return null;
        throw getNotFoundError(cmd);
    }
    return which_1;
}

var pathKey;
var hasRequiredPathKey;
function requirePathKey() {
    if (hasRequiredPathKey) return pathKey;
    hasRequiredPathKey = 1;
    pathKey = function(opts) {
        opts = opts || {};
        var env = opts.env || process.env;
        var platform = opts.platform || process.platform;
        if (platform !== 'win32') {
            return 'PATH';
        }
        return findKey(env, function(x) {
            return x.toUpperCase() === 'PATH';
        }) || 'Path';
    };
    return pathKey;
}

var resolveCommand_1;
var hasRequiredResolveCommand;
function requireResolveCommand() {
    if (hasRequiredResolveCommand) return resolveCommand_1;
    hasRequiredResolveCommand = 1;
    var path = require$$0$1;
    var which = requireWhich();
    var pathKey = requirePathKey()();
    function resolveCommandAttempt(parsed, withoutPathExt) {
        var cwd = process.cwd();
        var hasCustomCwd = parsed.options.cwd != null;
        // If a custom `cwd` was specified, we need to change the process cwd
        // because `which` will do stat calls but does not support a custom cwd
        if (hasCustomCwd) {
            try {
                process.chdir(parsed.options.cwd);
            } catch (err) {
            /* Empty */ }
        }
        var resolved;
        try {
            resolved = which.sync(parsed.command, {
                path: (parsed.options.env || process.env)[pathKey],
                pathExt: withoutPathExt ? pathDelimiter : undefined
            });
        } catch (e) {
        /* Empty */ } finally{
            process.chdir(cwd);
        }
        // If we successfully resolved, ensure that an absolute path is returned
        // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
        if (resolved) {
            resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
        }
        return resolved;
    }
    function resolveCommand(parsed) {
        return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    resolveCommand_1 = resolveCommand;
    return resolveCommand_1;
}

var _escape = {};

var hasRequired_escape;
function require_escape() {
    if (hasRequired_escape) return _escape;
    hasRequired_escape = 1;
    // See http://www.robvanderwoude.com/escapechars.php
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
        // Escape meta chars
        arg = arg.replace(metaCharsRegExp, '^$1');
        return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
        // Convert to string
        arg = "".concat(arg);
        // Algorithm below is based on https://qntm.org/cmd
        // Sequence of backslashes followed by a double quote:
        // double up all the backslashes and escape the double quote
        arg = arg.replace(/(\\*)"/g, '$1$1\\"');
        // Sequence of backslashes followed by the end of the string
        // (which will become a double quote later):
        // double up all the backslashes
        arg = arg.replace(/(\\*)$/, '$1$1');
        // All other backslashes occur literally
        // Quote the whole thing:
        arg = '"'.concat(arg, '"');
        // Escape meta chars
        arg = arg.replace(metaCharsRegExp, '^$1');
        // Double escape meta chars if necessary
        if (doubleEscapeMetaChars) {
            arg = arg.replace(metaCharsRegExp, '^$1');
        }
        return arg;
    }
    _escape.command = escapeCommand;
    _escape.argument = escapeArgument;
    return _escape;
}

var shebangRegex;
var hasRequiredShebangRegex;
function requireShebangRegex() {
    if (hasRequiredShebangRegex) return shebangRegex;
    hasRequiredShebangRegex = 1;
    shebangRegex = /^#!.*/;
    return shebangRegex;
}

var shebangCommand;
var hasRequiredShebangCommand;
function requireShebangCommand() {
    if (hasRequiredShebangCommand) return shebangCommand;
    hasRequiredShebangCommand = 1;
    var shebangRegex = requireShebangRegex();
    shebangCommand = function shebangCommand(str) {
        var match = str.match(shebangRegex);
        if (!match) {
            return null;
        }
        var arr = match[0].replace(/#! ?/, '').split(' ');
        var bin = arr[0].split('/').pop();
        var arg = arr[1];
        return bin === 'env' ? arg : bin + (arg ? ' ' + arg : '');
    };
    return shebangCommand;
}

var readShebang_1;
var hasRequiredReadShebang;
function requireReadShebang() {
    if (hasRequiredReadShebang) return readShebang_1;
    hasRequiredReadShebang = 1;
    var fs = require$$0;
    var shebangCommand = requireShebangCommand();
    function readShebang(command) {
        // Read the first 150 bytes from the file
        var size = 150;
        var buffer;
        if (Buffer.alloc) {
            // Node.js v4.5+ / v5.10+
            buffer = Buffer.alloc(size);
        } else {
            // Old Node.js API
            buffer = new Buffer(size);
            buffer.fill(0); // zero-fill
        }
        var fd;
        try {
            fd = fs.openSync(command, 'r');
            fs.readSync(fd, buffer, 0, size, 0);
            fs.closeSync(fd);
        } catch (e) {}
        // Attempt to extract shebang (null is returned if not a shebang)
        return shebangCommand(buffer.toString());
    }
    readShebang_1 = readShebang;
    return readShebang_1;
}

var semver = {
    exports: {}
};

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var hasRequiredSemver;
function requireSemver() {
    if (hasRequiredSemver) return semver.exports;
    hasRequiredSemver = 1;
    (function(module, exports) {
        exports = module.exports = SemVer;
        var debug;
        /* istanbul ignore next */ if ((typeof process === "undefined" ? "undefined" : _type_of(process)) === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
            debug = function debug() {
                var args = Array.prototype.slice.call(arguments, 0);
                args.unshift('SEMVER');
                console.log.apply(console, args);
            };
        } else {
            debug = function debug() {};
        }
        // Note: this is the semver.org version of the spec that it implements
        // Not necessarily the package version of this code.
        exports.SEMVER_SPEC_VERSION = '2.0.0';
        var MAX_LENGTH = 256;
        var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
        // Max safe segment length for coercion.
        var MAX_SAFE_COMPONENT_LENGTH = 16;
        var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
        // The actual regexps go on exports.re
        var re = exports.re = [];
        var safeRe = exports.safeRe = [];
        var src = exports.src = [];
        var R = 0;
        var LETTERDASHNUMBER = '[a-zA-Z0-9-]';
        // Replace some greedy regex tokens to prevent regex dos issues. These regex are
        // used internally via the safeRe object since all inputs in this library get
        // normalized first to trim and collapse all extra whitespace. The original
        // regexes are exported for userland consumption and lower level usage. A
        // future breaking change could export the safer regex only with a note that
        // all input should have extra whitespace removed.
        var safeRegexReplacements = [
            [
                '\\s',
                1
            ],
            [
                '\\d',
                MAX_LENGTH
            ],
            [
                LETTERDASHNUMBER,
                MAX_SAFE_BUILD_LENGTH
            ]
        ];
        function makeSafeRe(value) {
            for(var i = 0; i < safeRegexReplacements.length; i++){
                var token = safeRegexReplacements[i][0];
                var max = safeRegexReplacements[i][1];
                value = value.split(token + '*').join(token + '{0,' + max + '}').split(token + '+').join(token + '{1,' + max + '}');
            }
            return value;
        }
        // The following Regular Expressions can be used for tokenizing,
        // validating, and parsing SemVer version strings.
        // ## Numeric Identifier
        // A single `0`, or a non-zero digit followed by zero or more digits.
        var NUMERICIDENTIFIER = R++;
        src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
        var NUMERICIDENTIFIERLOOSE = R++;
        src[NUMERICIDENTIFIERLOOSE] = '\\d+';
        // ## Non-numeric Identifier
        // Zero or more digits, followed by a letter or hyphen, and then zero or
        // more letters, digits, or hyphens.
        var NONNUMERICIDENTIFIER = R++;
        src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-]' + LETTERDASHNUMBER + '*';
        // ## Main Version
        // Three dot-separated numeric identifiers.
        var MAINVERSION = R++;
        src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';
        var MAINVERSIONLOOSE = R++;
        src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')';
        // ## Pre-release Version Identifier
        // A numeric identifier, or a non-numeric identifier.
        var PRERELEASEIDENTIFIER = R++;
        src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';
        var PRERELEASEIDENTIFIERLOOSE = R++;
        src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';
        // ## Pre-release Version
        // Hyphen, followed by one or more dot-separated pre-release version
        // identifiers.
        var PRERELEASE = R++;
        src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
        var PRERELEASELOOSE = R++;
        src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';
        // ## Build Metadata Identifier
        // Any combination of digits, letters, or hyphens.
        var BUILDIDENTIFIER = R++;
        src[BUILDIDENTIFIER] = LETTERDASHNUMBER + '+';
        // ## Build Metadata
        // Plus sign, followed by one or more period-separated build metadata
        // identifiers.
        var BUILD = R++;
        src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';
        // ## Full Version String
        // A main version, followed optionally by a pre-release version and
        // build metadata.
        // Note that the only major, minor, patch, and pre-release sections of
        // the version string are capturing groups.  The build metadata is not a
        // capturing group, because it should not ever be used in version
        // comparison.
        var FULL = R++;
        var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';
        src[FULL] = '^' + FULLPLAIN + '$';
        // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
        // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
        // common in the npm registry.
        var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';
        var LOOSE = R++;
        src[LOOSE] = '^' + LOOSEPLAIN + '$';
        var GTLT = R++;
        src[GTLT] = '((?:<|>)?=?)';
        // Something like "2.*" or "1.2.x".
        // Note that "x.x" is a valid xRange identifer, meaning "any version"
        // Only the first item is strictly required.
        var XRANGEIDENTIFIERLOOSE = R++;
        src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
        var XRANGEIDENTIFIER = R++;
        src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
        var XRANGEPLAIN = R++;
        src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';
        var XRANGEPLAINLOOSE = R++;
        src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';
        var XRANGE = R++;
        src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
        var XRANGELOOSE = R++;
        src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';
        // Coercion.
        // Extract anything that could conceivably be a part of a valid semver
        var COERCE = R++;
        src[COERCE] = '(?:^|[^\\d])' + '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:$|[^\\d])';
        // Tilde ranges.
        // Meaning is "reasonably at or greater than"
        var LONETILDE = R++;
        src[LONETILDE] = '(?:~>?)';
        var TILDETRIM = R++;
        src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
        re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
        safeRe[TILDETRIM] = new RegExp(makeSafeRe(src[TILDETRIM]), 'g');
        var tildeTrimReplace = '$1~';
        var TILDE = R++;
        src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
        var TILDELOOSE = R++;
        src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';
        // Caret ranges.
        // Meaning is "at least and backwards compatible with"
        var LONECARET = R++;
        src[LONECARET] = '(?:\\^)';
        var CARETTRIM = R++;
        src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
        re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
        safeRe[CARETTRIM] = new RegExp(makeSafeRe(src[CARETTRIM]), 'g');
        var caretTrimReplace = '$1^';
        var CARET = R++;
        src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
        var CARETLOOSE = R++;
        src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';
        // A simple gt/lt/eq thing, or just "" to indicate "any version"
        var COMPARATORLOOSE = R++;
        src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
        var COMPARATOR = R++;
        src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';
        // An expression to strip any whitespace between the gtlt and the thing
        // it modifies, so that `> 1.2.3` ==> `>1.2.3`
        var COMPARATORTRIM = R++;
        src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';
        // this one has to use the /g flag
        re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
        safeRe[COMPARATORTRIM] = new RegExp(makeSafeRe(src[COMPARATORTRIM]), 'g');
        var comparatorTrimReplace = '$1$2$3';
        // Something like `1.2.3 - 1.2.4`
        // Note that these all use the loose form, because they'll be
        // checked against either the strict or loose comparator form
        // later.
        var HYPHENRANGE = R++;
        src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';
        var HYPHENRANGELOOSE = R++;
        src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$';
        // Star ranges basically just allow anything at all.
        var STAR = R++;
        src[STAR] = '(<|>)?=?\\s*\\*';
        // Compile to actual regexp objects.
        // All are flag-free, unless they were created above with a flag.
        for(var i = 0; i < R; i++){
            debug(i, src[i]);
            if (!re[i]) {
                re[i] = new RegExp(src[i]);
                // Replace all greedy whitespace to prevent regex dos issues. These regex are
                // used internally via the safeRe object since all inputs in this library get
                // normalized first to trim and collapse all extra whitespace. The original
                // regexes are exported for userland consumption and lower level usage. A
                // future breaking change could export the safer regex only with a note that
                // all input should have extra whitespace removed.
                safeRe[i] = new RegExp(makeSafeRe(src[i]));
            }
        }
        exports.parse = parse;
        function parse(version, options) {
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            if (_instanceof(version, SemVer)) {
                return version;
            }
            if (typeof version !== 'string') {
                return null;
            }
            if (version.length > MAX_LENGTH) {
                return null;
            }
            var r = options.loose ? safeRe[LOOSE] : safeRe[FULL];
            if (!r.test(version)) {
                return null;
            }
            try {
                return new SemVer(version, options);
            } catch (er) {
                return null;
            }
        }
        exports.valid = valid;
        function valid(version, options) {
            var v = parse(version, options);
            return v ? v.version : null;
        }
        exports.clean = clean;
        function clean(version, options) {
            var s = parse(version.trim().replace(/^[=v]+/, ''), options);
            return s ? s.version : null;
        }
        exports.SemVer = SemVer;
        function SemVer(version, options) {
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            if (_instanceof(version, SemVer)) {
                if (version.loose === options.loose) {
                    return version;
                } else {
                    version = version.version;
                }
            } else if (typeof version !== 'string') {
                throw new TypeError('Invalid Version: ' + version);
            }
            if (version.length > MAX_LENGTH) {
                throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
            }
            if (!_instanceof(this, SemVer)) {
                return new SemVer(version, options);
            }
            debug('SemVer', version, options);
            this.options = options;
            this.loose = !!options.loose;
            var m = version.trim().match(options.loose ? safeRe[LOOSE] : safeRe[FULL]);
            if (!m) {
                throw new TypeError('Invalid Version: ' + version);
            }
            this.raw = version;
            // these are actually numbers
            this.major = +m[1];
            this.minor = +m[2];
            this.patch = +m[3];
            if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
                throw new TypeError('Invalid major version');
            }
            if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
                throw new TypeError('Invalid minor version');
            }
            if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
                throw new TypeError('Invalid patch version');
            }
            // numberify any prerelease numeric ids
            if (!m[4]) {
                this.prerelease = [];
            } else {
                this.prerelease = m[4].split('.').map(function(id) {
                    if (/^[0-9]+$/.test(id)) {
                        var num = +id;
                        if (num >= 0 && num < MAX_SAFE_INTEGER) {
                            return num;
                        }
                    }
                    return id;
                });
            }
            this.build = m[5] ? m[5].split('.') : [];
            this.format();
        }
        SemVer.prototype.format = function() {
            this.version = this.major + '.' + this.minor + '.' + this.patch;
            if (this.prerelease.length) {
                this.version += '-' + this.prerelease.join('.');
            }
            return this.version;
        };
        SemVer.prototype.toString = function() {
            return this.version;
        };
        SemVer.prototype.compare = function(other) {
            debug('SemVer.compare', this.version, this.options, other);
            if (!_instanceof(other, SemVer)) {
                other = new SemVer(other, this.options);
            }
            return this.compareMain(other) || this.comparePre(other);
        };
        SemVer.prototype.compareMain = function(other) {
            if (!_instanceof(other, SemVer)) {
                other = new SemVer(other, this.options);
            }
            return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
        };
        SemVer.prototype.comparePre = function(other) {
            if (!_instanceof(other, SemVer)) {
                other = new SemVer(other, this.options);
            }
            // NOT having a prerelease is > having one
            if (this.prerelease.length && !other.prerelease.length) {
                return -1;
            } else if (!this.prerelease.length && other.prerelease.length) {
                return 1;
            } else if (!this.prerelease.length && !other.prerelease.length) {
                return 0;
            }
            var i = 0;
            do {
                var a = this.prerelease[i];
                var b = other.prerelease[i];
                debug('prerelease compare', i, a, b);
                if (a === undefined && b === undefined) {
                    return 0;
                } else if (b === undefined) {
                    return 1;
                } else if (a === undefined) {
                    return -1;
                } else if (a === b) {
                    continue;
                } else {
                    return compareIdentifiers(a, b);
                }
            }while (++i);
        };
        // preminor will bump the version up to the next minor release, and immediately
        // down to pre-release. premajor and prepatch work the same way.
        SemVer.prototype.inc = function(release, identifier) {
            switch(release){
                case 'premajor':
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor = 0;
                    this.major++;
                    this.inc('pre', identifier);
                    break;
                case 'preminor':
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor++;
                    this.inc('pre', identifier);
                    break;
                case 'prepatch':
                    // If this is already a prerelease, it will bump to the next version
                    // drop any prereleases that might already exist, since they are not
                    // relevant at this point.
                    this.prerelease.length = 0;
                    this.inc('patch', identifier);
                    this.inc('pre', identifier);
                    break;
                // If the input is a non-prerelease version, this acts the same as
                // prepatch.
                case 'prerelease':
                    if (this.prerelease.length === 0) {
                        this.inc('patch', identifier);
                    }
                    this.inc('pre', identifier);
                    break;
                case 'major':
                    // If this is a pre-major version, bump up to the same major version.
                    // Otherwise increment major.
                    // 1.0.0-5 bumps to 1.0.0
                    // 1.1.0 bumps to 2.0.0
                    if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                        this.major++;
                    }
                    this.minor = 0;
                    this.patch = 0;
                    this.prerelease = [];
                    break;
                case 'minor':
                    // If this is a pre-minor version, bump up to the same minor version.
                    // Otherwise increment minor.
                    // 1.2.0-5 bumps to 1.2.0
                    // 1.2.1 bumps to 1.3.0
                    if (this.patch !== 0 || this.prerelease.length === 0) {
                        this.minor++;
                    }
                    this.patch = 0;
                    this.prerelease = [];
                    break;
                case 'patch':
                    // If this is not a pre-release version, it will increment the patch.
                    // If it is a pre-release it will bump up to the same patch version.
                    // 1.2.0-5 patches to 1.2.0
                    // 1.2.0 patches to 1.2.1
                    if (this.prerelease.length === 0) {
                        this.patch++;
                    }
                    this.prerelease = [];
                    break;
                // This probably shouldn't be used publicly.
                // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
                case 'pre':
                    if (this.prerelease.length === 0) {
                        this.prerelease = [
                            0
                        ];
                    } else {
                        var i = this.prerelease.length;
                        while(--i >= 0){
                            if (typeof this.prerelease[i] === 'number') {
                                this.prerelease[i]++;
                                i = -2;
                            }
                        }
                        if (i === -1) {
                            // didn't increment anything
                            this.prerelease.push(0);
                        }
                    }
                    if (identifier) {
                        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                        if (this.prerelease[0] === identifier) {
                            if (isNaN(this.prerelease[1])) {
                                this.prerelease = [
                                    identifier,
                                    0
                                ];
                            }
                        } else {
                            this.prerelease = [
                                identifier,
                                0
                            ];
                        }
                    }
                    break;
                default:
                    throw new Error('invalid increment argument: ' + release);
            }
            this.format();
            this.raw = this.version;
            return this;
        };
        exports.inc = inc;
        function inc(version, release, loose, identifier) {
            if (typeof loose === 'string') {
                identifier = loose;
                loose = undefined;
            }
            try {
                return new SemVer(version, loose).inc(release, identifier).version;
            } catch (er) {
                return null;
            }
        }
        exports.diff = diff;
        function diff(version1, version2) {
            if (eq(version1, version2)) {
                return null;
            } else {
                var v1 = parse(version1);
                var v2 = parse(version2);
                var prefix = '';
                if (v1.prerelease.length || v2.prerelease.length) {
                    prefix = 'pre';
                    var defaultResult = 'prerelease';
                }
                for(var key in v1){
                    if (key === 'major' || key === 'minor' || key === 'patch') {
                        if (v1[key] !== v2[key]) {
                            return prefix + key;
                        }
                    }
                }
                return defaultResult // may be undefined
                ;
            }
        }
        exports.compareIdentifiers = compareIdentifiers;
        var numeric = /^[0-9]+$/;
        function compareIdentifiers(a, b) {
            var anum = numeric.test(a);
            var bnum = numeric.test(b);
            if (anum && bnum) {
                a = +a;
                b = +b;
            }
            return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
        }
        exports.rcompareIdentifiers = rcompareIdentifiers;
        function rcompareIdentifiers(a, b) {
            return compareIdentifiers(b, a);
        }
        exports.major = major;
        function major(a, loose) {
            return new SemVer(a, loose).major;
        }
        exports.minor = minor;
        function minor(a, loose) {
            return new SemVer(a, loose).minor;
        }
        exports.patch = patch;
        function patch(a, loose) {
            return new SemVer(a, loose).patch;
        }
        exports.compare = compare;
        function compare(a, b, loose) {
            return new SemVer(a, loose).compare(new SemVer(b, loose));
        }
        exports.compareLoose = compareLoose;
        function compareLoose(a, b) {
            return compare(a, b, true);
        }
        exports.rcompare = rcompare;
        function rcompare(a, b, loose) {
            return compare(b, a, loose);
        }
        exports.sort = sort;
        function sort(list, loose) {
            return list.sort(function(a, b) {
                return exports.compare(a, b, loose);
            });
        }
        exports.rsort = rsort;
        function rsort(list, loose) {
            return list.sort(function(a, b) {
                return exports.rcompare(a, b, loose);
            });
        }
        exports.gt = gt;
        function gt(a, b, loose) {
            return compare(a, b, loose) > 0;
        }
        exports.lt = lt;
        function lt(a, b, loose) {
            return compare(a, b, loose) < 0;
        }
        exports.eq = eq;
        function eq(a, b, loose) {
            return compare(a, b, loose) === 0;
        }
        exports.neq = neq;
        function neq(a, b, loose) {
            return compare(a, b, loose) !== 0;
        }
        exports.gte = gte;
        function gte(a, b, loose) {
            return compare(a, b, loose) >= 0;
        }
        exports.lte = lte;
        function lte(a, b, loose) {
            return compare(a, b, loose) <= 0;
        }
        exports.cmp = cmp;
        function cmp(a, op, b, loose) {
            switch(op){
                case '===':
                    if ((typeof a === "undefined" ? "undefined" : _type_of(a)) === 'object') a = a.version;
                    if ((typeof b === "undefined" ? "undefined" : _type_of(b)) === 'object') b = b.version;
                    return a === b;
                case '!==':
                    if ((typeof a === "undefined" ? "undefined" : _type_of(a)) === 'object') a = a.version;
                    if ((typeof b === "undefined" ? "undefined" : _type_of(b)) === 'object') b = b.version;
                    return a !== b;
                case '':
                case '=':
                case '==':
                    return eq(a, b, loose);
                case '!=':
                    return neq(a, b, loose);
                case '>':
                    return gt(a, b, loose);
                case '>=':
                    return gte(a, b, loose);
                case '<':
                    return lt(a, b, loose);
                case '<=':
                    return lte(a, b, loose);
                default:
                    throw new TypeError('Invalid operator: ' + op);
            }
        }
        exports.Comparator = Comparator;
        function Comparator(comp, options) {
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            if (_instanceof(comp, Comparator)) {
                if (comp.loose === !!options.loose) {
                    return comp;
                } else {
                    comp = comp.value;
                }
            }
            if (!_instanceof(this, Comparator)) {
                return new Comparator(comp, options);
            }
            comp = comp.trim().split(/\s+/).join(' ');
            debug('comparator', comp, options);
            this.options = options;
            this.loose = !!options.loose;
            this.parse(comp);
            if (this.semver === ANY) {
                this.value = '';
            } else {
                this.value = this.operator + this.semver.version;
            }
            debug('comp', this);
        }
        var ANY = {};
        Comparator.prototype.parse = function(comp) {
            var r = this.options.loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
            var m = comp.match(r);
            if (!m) {
                throw new TypeError('Invalid comparator: ' + comp);
            }
            this.operator = m[1];
            if (this.operator === '=') {
                this.operator = '';
            }
            // if it literally is just '>' or '' then allow anything.
            if (!m[2]) {
                this.semver = ANY;
            } else {
                this.semver = new SemVer(m[2], this.options.loose);
            }
        };
        Comparator.prototype.toString = function() {
            return this.value;
        };
        Comparator.prototype.test = function(version) {
            debug('Comparator.test', version, this.options.loose);
            if (this.semver === ANY) {
                return true;
            }
            if (typeof version === 'string') {
                version = new SemVer(version, this.options);
            }
            return cmp(version, this.operator, this.semver, this.options);
        };
        Comparator.prototype.intersects = function(comp, options) {
            if (!_instanceof(comp, Comparator)) {
                throw new TypeError('a Comparator is required');
            }
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            var rangeTmp;
            if (this.operator === '') {
                rangeTmp = new Range(comp.value, options);
                return satisfies(this.value, rangeTmp, options);
            } else if (comp.operator === '') {
                rangeTmp = new Range(this.value, options);
                return satisfies(comp.semver, rangeTmp, options);
            }
            var sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
            var sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
            var sameSemVer = this.semver.version === comp.semver.version;
            var differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
            var oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
            var oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
            return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
        };
        exports.Range = Range;
        function Range(range, options) {
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            if (_instanceof(range, Range)) {
                if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
                    return range;
                } else {
                    return new Range(range.raw, options);
                }
            }
            if (_instanceof(range, Comparator)) {
                return new Range(range.value, options);
            }
            if (!_instanceof(this, Range)) {
                return new Range(range, options);
            }
            this.options = options;
            this.loose = !!options.loose;
            this.includePrerelease = !!options.includePrerelease;
            // First reduce all whitespace as much as possible so we do not have to rely
            // on potentially slow regexes like \s*. This is then stored and used for
            // future error messages as well.
            this.raw = range.trim().split(/\s+/).join(' ');
            // First, split based on boolean or ||
            this.set = this.raw.split('||').map(function(range) {
                return this.parseRange(range.trim());
            }, this).filter(function(c) {
                // throw out any that are not relevant for whatever reason
                return c.length;
            });
            if (!this.set.length) {
                throw new TypeError('Invalid SemVer Range: ' + this.raw);
            }
            this.format();
        }
        Range.prototype.format = function() {
            this.range = this.set.map(function(comps) {
                return comps.join(' ').trim();
            }).join('||').trim();
            return this.range;
        };
        Range.prototype.toString = function() {
            return this.range;
        };
        Range.prototype.parseRange = function(range) {
            var loose = this.options.loose;
            // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
            var hr = loose ? safeRe[HYPHENRANGELOOSE] : safeRe[HYPHENRANGE];
            range = range.replace(hr, hyphenReplace);
            debug('hyphen replace', range);
            // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
            range = range.replace(safeRe[COMPARATORTRIM], comparatorTrimReplace);
            debug('comparator trim', range, safeRe[COMPARATORTRIM]);
            // `~ 1.2.3` => `~1.2.3`
            range = range.replace(safeRe[TILDETRIM], tildeTrimReplace);
            // `^ 1.2.3` => `^1.2.3`
            range = range.replace(safeRe[CARETTRIM], caretTrimReplace);
            // At this point, the range is completely trimmed and
            // ready to be split into comparators.
            var compRe = loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
            var set = range.split(' ').map(function(comp) {
                return parseComparator(comp, this.options);
            }, this).join(' ').split(/\s+/);
            if (this.options.loose) {
                // in loose mode, throw out any that are not valid comparators
                set = set.filter(function(comp) {
                    return !!comp.match(compRe);
                });
            }
            set = set.map(function(comp) {
                return new Comparator(comp, this.options);
            }, this);
            return set;
        };
        Range.prototype.intersects = function(range, options) {
            if (!_instanceof(range, Range)) {
                throw new TypeError('a Range is required');
            }
            return this.set.some(function(thisComparators) {
                return thisComparators.every(function(thisComparator) {
                    return range.set.some(function(rangeComparators) {
                        return rangeComparators.every(function(rangeComparator) {
                            return thisComparator.intersects(rangeComparator, options);
                        });
                    });
                });
            });
        };
        // Mostly just for testing and legacy API reasons
        exports.toComparators = toComparators;
        function toComparators(range, options) {
            return new Range(range, options).set.map(function(comp) {
                return comp.map(function(c) {
                    return c.value;
                }).join(' ').trim().split(' ');
            });
        }
        // comprised of xranges, tildes, stars, and gtlt's at this point.
        // already replaced the hyphen ranges
        // turn into a set of JUST comparators.
        function parseComparator(comp, options) {
            debug('comp', comp, options);
            comp = replaceCarets(comp, options);
            debug('caret', comp);
            comp = replaceTildes(comp, options);
            debug('tildes', comp);
            comp = replaceXRanges(comp, options);
            debug('xrange', comp);
            comp = replaceStars(comp, options);
            debug('stars', comp);
            return comp;
        }
        function isX(id) {
            return !id || id.toLowerCase() === 'x' || id === '*';
        }
        // ~, ~> --> * (any, kinda silly)
        // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
        // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
        // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
        // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
        // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
        function replaceTildes(comp, options) {
            return comp.trim().split(/\s+/).map(function(comp) {
                return replaceTilde(comp, options);
            }).join(' ');
        }
        function replaceTilde(comp, options) {
            var r = options.loose ? safeRe[TILDELOOSE] : safeRe[TILDE];
            return comp.replace(r, function(_, M, m, p, pr) {
                debug('tilde', comp, _, M, m, p, pr);
                var ret;
                if (isX(M)) {
                    ret = '';
                } else if (isX(m)) {
                    ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
                } else if (isX(p)) {
                    // ~1.2 == >=1.2.0 <1.3.0
                    ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
                } else if (pr) {
                    debug('replaceTilde pr', pr);
                    ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + (+m + 1) + '.0';
                } else {
                    // ~1.2.3 == >=1.2.3 <1.3.0
                    ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
                }
                debug('tilde return', ret);
                return ret;
            });
        }
        // ^ --> * (any, kinda silly)
        // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
        // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
        // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
        // ^1.2.3 --> >=1.2.3 <2.0.0
        // ^1.2.0 --> >=1.2.0 <2.0.0
        function replaceCarets(comp, options) {
            return comp.trim().split(/\s+/).map(function(comp) {
                return replaceCaret(comp, options);
            }).join(' ');
        }
        function replaceCaret(comp, options) {
            debug('caret', comp, options);
            var r = options.loose ? safeRe[CARETLOOSE] : safeRe[CARET];
            return comp.replace(r, function(_, M, m, p, pr) {
                debug('caret', comp, _, M, m, p, pr);
                var ret;
                if (isX(M)) {
                    ret = '';
                } else if (isX(m)) {
                    ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
                } else if (isX(p)) {
                    if (M === '0') {
                        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
                    } else {
                        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
                    }
                } else if (pr) {
                    debug('replaceCaret pr', pr);
                    if (M === '0') {
                        if (m === '0') {
                            ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + m + '.' + (+p + 1);
                        } else {
                            ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + (+m + 1) + '.0';
                        }
                    } else {
                        ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + (+M + 1) + '.0.0';
                    }
                } else {
                    debug('no pr');
                    if (M === '0') {
                        if (m === '0') {
                            ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);
                        } else {
                            ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
                        }
                    } else {
                        ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
                    }
                }
                debug('caret return', ret);
                return ret;
            });
        }
        function replaceXRanges(comp, options) {
            debug('replaceXRanges', comp, options);
            return comp.split(/\s+/).map(function(comp) {
                return replaceXRange(comp, options);
            }).join(' ');
        }
        function replaceXRange(comp, options) {
            comp = comp.trim();
            var r = options.loose ? safeRe[XRANGELOOSE] : safeRe[XRANGE];
            return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
                debug('xRange', comp, ret, gtlt, M, m, p, pr);
                var xM = isX(M);
                var xm = xM || isX(m);
                var xp = xm || isX(p);
                var anyX = xp;
                if (gtlt === '=' && anyX) {
                    gtlt = '';
                }
                if (xM) {
                    if (gtlt === '>' || gtlt === '<') {
                        // nothing is allowed
                        ret = '<0.0.0';
                    } else {
                        // nothing is forbidden
                        ret = '*';
                    }
                } else if (gtlt && anyX) {
                    // we know patch is an x, because we have any x at all.
                    // replace X with 0
                    if (xm) {
                        m = 0;
                    }
                    p = 0;
                    if (gtlt === '>') {
                        // >1 => >=2.0.0
                        // >1.2 => >=1.3.0
                        // >1.2.3 => >= 1.2.4
                        gtlt = '>=';
                        if (xm) {
                            M = +M + 1;
                            m = 0;
                            p = 0;
                        } else {
                            m = +m + 1;
                            p = 0;
                        }
                    } else if (gtlt === '<=') {
                        // <=0.7.x is actually <0.8.0, since any 0.7.x should
                        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
                        gtlt = '<';
                        if (xm) {
                            M = +M + 1;
                        } else {
                            m = +m + 1;
                        }
                    }
                    ret = gtlt + M + '.' + m + '.' + p;
                } else if (xm) {
                    ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
                } else if (xp) {
                    ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
                }
                debug('xRange return', ret);
                return ret;
            });
        }
        // Because * is AND-ed with everything else in the comparator,
        // and '' means "any version", just remove the *s entirely.
        function replaceStars(comp, options) {
            debug('replaceStars', comp, options);
            // Looseness is ignored here.  star is always as loose as it gets!
            return comp.trim().replace(safeRe[STAR], '');
        }
        // This function is passed to string.replace(safeRe[HYPHENRANGE])
        // M, m, patch, prerelease, build
        // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
        // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
        // 1.2 - 3.4 => >=1.2.0 <3.5.0
        function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
            if (isX(fM)) {
                from = '';
            } else if (isX(fm)) {
                from = '>=' + fM + '.0.0';
            } else if (isX(fp)) {
                from = '>=' + fM + '.' + fm + '.0';
            } else {
                from = '>=' + from;
            }
            if (isX(tM)) {
                to = '';
            } else if (isX(tm)) {
                to = '<' + (+tM + 1) + '.0.0';
            } else if (isX(tp)) {
                to = '<' + tM + '.' + (+tm + 1) + '.0';
            } else if (tpr) {
                to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
            } else {
                to = '<=' + to;
            }
            return (from + ' ' + to).trim();
        }
        // if ANY of the sets match ALL of its comparators, then pass
        Range.prototype.test = function(version) {
            if (!version) {
                return false;
            }
            if (typeof version === 'string') {
                version = new SemVer(version, this.options);
            }
            for(var i = 0; i < this.set.length; i++){
                if (testSet(this.set[i], version, this.options)) {
                    return true;
                }
            }
            return false;
        };
        function testSet(set, version, options) {
            for(var i = 0; i < set.length; i++){
                if (!set[i].test(version)) {
                    return false;
                }
            }
            if (version.prerelease.length && !options.includePrerelease) {
                // Find the set of versions that are allowed to have prereleases
                // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
                // That should allow `1.2.3-pr.2` to pass.
                // However, `1.2.4-alpha.notready` should NOT be allowed,
                // even though it's within the range set by the comparators.
                for(i = 0; i < set.length; i++){
                    debug(set[i].semver);
                    if (set[i].semver === ANY) {
                        continue;
                    }
                    if (set[i].semver.prerelease.length > 0) {
                        var allowed = set[i].semver;
                        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
                            return true;
                        }
                    }
                }
                // Version has a -pre, but it's not one of the ones we like.
                return false;
            }
            return true;
        }
        exports.satisfies = satisfies;
        function satisfies(version, range, options) {
            try {
                range = new Range(range, options);
            } catch (er) {
                return false;
            }
            return range.test(version);
        }
        exports.maxSatisfying = maxSatisfying;
        function maxSatisfying(versions, range, options) {
            var max = null;
            var maxSV = null;
            try {
                var rangeObj = new Range(range, options);
            } catch (er) {
                return null;
            }
            versions.forEach(function(v) {
                if (rangeObj.test(v)) {
                    // satisfies(v, range, options)
                    if (!max || maxSV.compare(v) === -1) {
                        // compare(max, v, true)
                        max = v;
                        maxSV = new SemVer(max, options);
                    }
                }
            });
            return max;
        }
        exports.minSatisfying = minSatisfying;
        function minSatisfying(versions, range, options) {
            var min = null;
            var minSV = null;
            try {
                var rangeObj = new Range(range, options);
            } catch (er) {
                return null;
            }
            versions.forEach(function(v) {
                if (rangeObj.test(v)) {
                    // satisfies(v, range, options)
                    if (!min || minSV.compare(v) === 1) {
                        // compare(min, v, true)
                        min = v;
                        minSV = new SemVer(min, options);
                    }
                }
            });
            return min;
        }
        exports.minVersion = minVersion;
        function minVersion(range, loose) {
            range = new Range(range, loose);
            var minver = new SemVer('0.0.0');
            if (range.test(minver)) {
                return minver;
            }
            minver = new SemVer('0.0.0-0');
            if (range.test(minver)) {
                return minver;
            }
            minver = null;
            for(var i = 0; i < range.set.length; ++i){
                var comparators = range.set[i];
                comparators.forEach(function(comparator) {
                    // Clone to avoid manipulating the comparator's semver object.
                    var compver = new SemVer(comparator.semver.version);
                    switch(comparator.operator){
                        case '>':
                            if (compver.prerelease.length === 0) {
                                compver.patch++;
                            } else {
                                compver.prerelease.push(0);
                            }
                            compver.raw = compver.format();
                        /* fallthrough */ case '':
                        case '>=':
                            if (!minver || gt(minver, compver)) {
                                minver = compver;
                            }
                            break;
                        case '<':
                        case '<=':
                            break;
                        /* istanbul ignore next */ default:
                            throw new Error('Unexpected operation: ' + comparator.operator);
                    }
                });
            }
            if (minver && range.test(minver)) {
                return minver;
            }
            return null;
        }
        exports.validRange = validRange;
        function validRange(range, options) {
            try {
                // Return '*' instead of '' so that truthiness works.
                // This will throw if it's invalid anyway
                return new Range(range, options).range || '*';
            } catch (er) {
                return null;
            }
        }
        // Determine if version is less than all the versions possible in the range
        exports.ltr = ltr;
        function ltr(version, range, options) {
            return outside(version, range, '<', options);
        }
        // Determine if version is greater than all the versions possible in the range.
        exports.gtr = gtr;
        function gtr(version, range, options) {
            return outside(version, range, '>', options);
        }
        exports.outside = outside;
        function outside(version, range, hilo, options) {
            version = new SemVer(version, options);
            range = new Range(range, options);
            var gtfn, ltefn, ltfn, comp, ecomp;
            switch(hilo){
                case '>':
                    gtfn = gt;
                    ltefn = lte;
                    ltfn = lt;
                    comp = '>';
                    ecomp = '>=';
                    break;
                case '<':
                    gtfn = lt;
                    ltefn = gte;
                    ltfn = gt;
                    comp = '<';
                    ecomp = '<=';
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            // If it satisifes the range it is not outside
            if (satisfies(version, range, options)) {
                return false;
            }
            // From now on, variable terms are as if we're in "gtr" mode.
            // but note that everything is flipped for the "ltr" function.
            for(var i = 0; i < range.set.length; ++i){
                var comparators = range.set[i];
                var high = null;
                var low = null;
                comparators.forEach(function(comparator) {
                    if (comparator.semver === ANY) {
                        comparator = new Comparator('>=0.0.0');
                    }
                    high = high || comparator;
                    low = low || comparator;
                    if (gtfn(comparator.semver, high.semver, options)) {
                        high = comparator;
                    } else if (ltfn(comparator.semver, low.semver, options)) {
                        low = comparator;
                    }
                });
                // If the edge version comparator has a operator then our version
                // isn't outside it
                if (high.operator === comp || high.operator === ecomp) {
                    return false;
                }
                // If the lowest version comparator has an operator and our version
                // is less than it then it isn't higher than the range
                if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
                    return false;
                } else if (low.operator === ecomp && ltfn(version, low.semver)) {
                    return false;
                }
            }
            return true;
        }
        exports.prerelease = prerelease;
        function prerelease(version, options) {
            var parsed = parse(version, options);
            return parsed && parsed.prerelease.length ? parsed.prerelease : null;
        }
        exports.intersects = intersects;
        function intersects(r1, r2, options) {
            r1 = new Range(r1, options);
            r2 = new Range(r2, options);
            return r1.intersects(r2);
        }
        exports.coerce = coerce;
        function coerce(version) {
            if (_instanceof(version, SemVer)) {
                return version;
            }
            if (typeof version !== 'string') {
                return null;
            }
            var match = version.match(safeRe[COERCE]);
            if (match == null) {
                return null;
            }
            return parse(match[1] + '.' + (match[2] || '0') + '.' + (match[3] || '0'));
        }
    })(semver, semver.exports);
    return semver.exports;
}

var parse_1;
var hasRequiredParse;
function requireParse() {
    if (hasRequiredParse) return parse_1;
    hasRequiredParse = 1;
    var path = require$$0$1;
    var niceTry = requireSrc();
    var resolveCommand = requireResolveCommand();
    var escape = require_escape();
    var readShebang = requireReadShebang();
    var semver = requireSemver();
    var isWin = process.platform === 'win32';
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    // `options.shell` is supported in Node ^4.8.0, ^5.7.0 and >= 6.0.0
    var supportsShellOption = niceTry(function() {
        return semver.satisfies(process.version, '^4.8.0 || ^5.7.0 || >= 6.0.0', true);
    }) || false;
    function detectShebang(parsed) {
        parsed.file = resolveCommand(parsed);
        var shebang = parsed.file && readShebang(parsed.file);
        if (shebang) {
            parsed.args.unshift(parsed.file);
            parsed.command = shebang;
            return resolveCommand(parsed);
        }
        return parsed.file;
    }
    function parseNonShell(parsed) {
        if (!isWin) {
            return parsed;
        }
        // Detect & add support for shebangs
        var commandFile = detectShebang(parsed);
        // We don't need a shell if the command filename is an executable
        var needsShell = !isExecutableRegExp.test(commandFile);
        // If a shell is required, use cmd.exe and take care of escaping everything correctly
        // Note that `forceShell` is an hidden option used only in tests
        if (parsed.options.forceShell || needsShell) {
            // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
            // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
            // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
            // we need to double escape them
            var needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
            // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
            // This is necessary otherwise it will always fail with ENOENT in those cases
            parsed.command = path.normalize(parsed.command);
            // Escape command & arguments
            parsed.command = escape.command(parsed.command);
            parsed.args = parsed.args.map(function(arg) {
                return escape.argument(arg, needsDoubleEscapeMetaChars);
            });
            var shellCommand = [
                parsed.command
            ].concat(parsed.args).join(' ');
            parsed.args = [
                '/d',
                '/s',
                '/c',
                '"'.concat(shellCommand, '"')
            ];
            parsed.command = process.env.comspec || 'cmd.exe';
            parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
        }
        return parsed;
    }
    function parseShell(parsed) {
        // If node supports the shell option, there's no need to mimic its behavior
        if (supportsShellOption) {
            return parsed;
        }
        // Mimic node shell option
        // See https://github.com/nodejs/node/blob/b9f6a2dc059a1062776133f3d4fd848c4da7d150/lib/child_process.js#L335
        var shellCommand = [
            parsed.command
        ].concat(parsed.args).join(' ');
        if (isWin) {
            parsed.command = typeof parsed.options.shell === 'string' ? parsed.options.shell : process.env.comspec || 'cmd.exe';
            parsed.args = [
                '/d',
                '/s',
                '/c',
                '"'.concat(shellCommand, '"')
            ];
            parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
        } else {
            if (typeof parsed.options.shell === 'string') {
                parsed.command = parsed.options.shell;
            } else if (process.platform === 'android') {
                parsed.command = '/system/bin/sh';
            } else {
                parsed.command = '/bin/sh';
            }
            parsed.args = [
                '-c',
                shellCommand
            ];
        }
        return parsed;
    }
    function parse(command, args, options) {
        // Normalize arguments, similar to nodejs
        if (args && !Array.isArray(args)) {
            options = args;
            args = null;
        }
        args = args ? args.slice(0) : []; // Clone array to avoid changing the original
        options = objectAssign({}, options); // Clone object to avoid changing the original
        // Build our parsed object
        var parsed = {
            command: command,
            args: args,
            options: options,
            file: undefined,
            original: {
                command: command,
                args: args
            }
        };
        // Delegate further parsing to shell or non-shell
        return options.shell ? parseShell(parsed) : parseNonShell(parsed);
    }
    parse_1 = parse;
    return parse_1;
}

var enoent;
var hasRequiredEnoent;
function requireEnoent() {
    if (hasRequiredEnoent) return enoent;
    hasRequiredEnoent = 1;
    var isWin = process.platform === 'win32';
    function notFoundError(original, syscall) {
        return objectAssign(new Error("".concat(syscall, " ").concat(original.command, " ENOENT")), {
            code: 'ENOENT',
            errno: 'ENOENT',
            syscall: "".concat(syscall, " ").concat(original.command),
            path: original.command,
            spawnargs: original.args
        });
    }
    function hookChildProcess(cp, parsed) {
        if (!isWin) {
            return;
        }
        var originalEmit = cp.emit;
        cp.emit = function(name, arg1) {
            // If emitting "exit" event and exit code is 1, we need to check if
            // the command exists and emit an "error" instead
            // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
            if (name === 'exit') {
                var err = verifyENOENT(arg1, parsed);
                if (err) {
                    return originalEmit.call(cp, 'error', err);
                }
            }
            return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
        };
    }
    function verifyENOENT(status, parsed) {
        if (isWin && status === 1 && !parsed.file) {
            return notFoundError(parsed.original, 'spawn');
        }
        return null;
    }
    function verifyENOENTSync(status, parsed) {
        if (isWin && status === 1 && !parsed.file) {
            return notFoundError(parsed.original, 'spawnSync');
        }
        return null;
    }
    enoent = {
        hookChildProcess: hookChildProcess,
        verifyENOENT: verifyENOENT,
        verifyENOENTSync: verifyENOENTSync,
        notFoundError: notFoundError
    };
    return enoent;
}

var hasRequiredCrossSpawn6_0_5;
function requireCrossSpawn6_0_5() {
    if (hasRequiredCrossSpawn6_0_5) return crossSpawn6_0_5.exports;
    hasRequiredCrossSpawn6_0_5 = 1;
    var cp = require$$0$2;
    var parse = requireParse();
    var enoent = requireEnoent();
    function spawn(command, args, options) {
        // Parse the arguments
        var parsed = parse(command, args, options);
        // Spawn the child process
        var spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
        // Hook into child process "exit" event to emit an error if the command
        // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
        enoent.hookChildProcess(spawned, parsed);
        return spawned;
    }
    function spawnSync(command, args, options) {
        // Parse the arguments
        var parsed = parse(command, args, options);
        // Spawn the child process
        var result = cpSpawnSync(parsed.command, parsed.args, parsed.options);
        // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
        result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
        return result;
    }
    crossSpawn6_0_5.exports = spawn;
    crossSpawn6_0_5.exports.spawn = spawn;
    crossSpawn6_0_5.exports.sync = spawnSync;
    crossSpawn6_0_5.exports._parse = parse;
    crossSpawn6_0_5.exports._enoent = enoent;
    return crossSpawn6_0_5.exports;
}

var crossSpawn6_0_5Exports = requireCrossSpawn6_0_5();
var index = /*@__PURE__*/ getDefaultExportFromCjs(crossSpawn6_0_5Exports);

module.exports = index;
