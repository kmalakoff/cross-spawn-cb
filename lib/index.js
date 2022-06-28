require('./polyfills');
module.exports = require('./spawnCallback');
module.exports.sync = require('./spawnSyncCallback');

var pathKey = require('./path-key');
module.exports.pathKey = pathKey.default || pathKey;
