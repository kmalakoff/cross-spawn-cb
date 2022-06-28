'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var pathKey$1 = {
  exports: {}
};

var pathKey = function pathKey() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var environment = options.env || process.env;
  var platform = options.platform || process.platform;

  if (platform !== 'win32') {
    return 'PATH';
  }

  return Object.keys(environment).reverse().find(function (key) {
    return key.toUpperCase() === 'PATH';
  }) || 'Path';
};

pathKey$1.exports = pathKey; // TODO: Remove this for the next major release

pathKey$1.exports["default"] = pathKey;
exports["default"] = pathKey$1.exports;
