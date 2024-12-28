const major = +process.versions.node.split('.')[0];

function loadPolyFills() {
  require('./polyfills.cjs');
  return require('../../assets/cross-spawn-6.0.5.js');
}

module.exports = major <= 7 ? loadPolyFills() : require('cross-spawn');
