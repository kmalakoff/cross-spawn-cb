require('core-js/actual/object/assign');

var path = require('path');
if (typeof path.delimiter === 'undefined') path.delimiter = process.platform === 'win32' ? ';' : ':';
