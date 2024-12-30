const spawn_ = require('./spawn.cjs');
module.exports = require('./workers/spawnCallback.cjs');
module.exports.sync = require('./workers/spawnSyncCallback.cjs');
module.exports.spawn = spawn_;
module.exports._parse = spawn_._parse;
module.exports._enoent = spawn_._enoent;
