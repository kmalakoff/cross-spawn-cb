const major = +process.versions.node.split('.')[0];

module.exports = major <= 7 ? require('./crossSpawnCompat.cjs') : require('cross-spawn');
