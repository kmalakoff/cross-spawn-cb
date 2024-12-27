const major = +process.versions.node.split('.')[0];
module.exports = major <= 7 ? require('../../assets/cross-spawn-6.0.5.js') : require('cross-spawn');
