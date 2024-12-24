const major = +process.versions.node.split('.')[0];
// TODO: fix transform file extensions for cjs
const spawn = major <= 7 ? require('../../assets/cross-spawn-6.0.5.' + 'cjs').spawn : require('cross-spawn').spawn;

module.exports = spawn;
