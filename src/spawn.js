const major = +process.versions.node.split('.')[0];
const spawn = major <= 7 ? require('../../assets/cross-spawn-6.0.5').spawn : require('cross-spawn').spawn;
module.exports = spawn;
