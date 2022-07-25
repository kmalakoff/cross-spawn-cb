// require('core-js/actual/object/assign');
// require('core-js/actual/object/keys');
// require('core-js/actual/array/find');

if (!Object.assign) Object.assign = require('just-extend');
if (!Object.keys) Object.keys = require('object-keys');

if (!Array.prototype.find) {
  Array.prototype.find = function find(fn) {
    for (var i = 0; i < this.length; i++) {
      if (fn(this[i])) return this[i];
    }
    return null;
  };
}

var path = require('path');
if (typeof path.delimiter === 'undefined') path.delimiter = process.platform === 'win32' ? ';' : ':';

if (!Buffer.from) {
  Buffer.from = function from(data) {
    // eslint-disable-next-line n/no-deprecated-api
    return new Buffer(data);
  };
}
if (!Buffer.alloc) Buffer.alloc = Buffer.from;
