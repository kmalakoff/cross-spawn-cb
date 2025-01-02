const major = +process.versions.node.split('.')[0];

module.exports = major <= 7 ? require('./polyfills/crossSpawnCompat.cjs') : require('cross-spawn');
