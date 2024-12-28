const major = +process.versions.node.split('.')[0];

module.exports = major <= 7 ? require('./spawnCompat/index.cjs') : require('cross-spawn');
