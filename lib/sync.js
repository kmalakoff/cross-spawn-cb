var assign = require('object-assign');
var spawnSync = require('spawn-sync');

module.exports = function crossSpawnSync(command, args, options) {
  if (!options) options = {};
  else options = assign({}, options);
  if (options.stdio === 'string') {
    options.stdio = 'pipe';
    options.encoding = 'utf-8';
  } else if (options.stdout === 'string') {
    options.stdout = 'pipe';
    options.encoding = 'utf-8';
  } else if (options.stderr === 'string') {
    options.stderr = 'pipe';
    options.encoding = 'utf-8';
  }
  return spawnSync(command, args, options);
};
