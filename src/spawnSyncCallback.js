const constants = require('./constants');

const major = +process.versions.node.split('.')[0];
const spawnSync = major <= 7 ? require('../../assets/cross-spawn-6.0.5.js').sync : require('cross-spawn').sync;

module.exports = function spawnSyncCallback(command, args, options) {
  options = options || {};
  const syncOptions = Object.assign({}, options || {}, {
    env: options.env || process.env,
    stdio: 'pipe',
    encoding: 'utf8',
  });

  const res = spawnSync(command, args, syncOptions);

  // patch: early node on windows could return null
  if (res.status === null) console.log('spawnSyncCallback null status code', res);
  // res.status = res.status === null ? 0 : res.status;

  // pipe if inherited
  if (res.stdout && (options.stdout === 'inherit' || options.stdio === 'inherit')) {
    process.stdout.write(res.stdout);
    res.stdout = null;
  }
  if (res.stderr && (options.stderr === 'inherit' || options.stdio === 'inherit')) {
    process.stderr.write(res.stderr);
    res.stderr = null;
  }

  // process errors
  let err = res.status !== 0 ? new Error(`Non-zero exit code: ${res.status}`) : null;
  if (res.stderr && res.stderr.length) {
    err = err || new Error('stderr has content');
    for (const key in res) {
      if (constants.spawnKeys.indexOf(key) < 0) continue;
      err[key] = Buffer.isBuffer(res[key]) ? res[key].toString('utf8') : res[key];
    }
  }
  if (err) throw err;
  return res;
};
