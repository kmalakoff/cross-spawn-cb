const assert = require('assert');
const spawn = require('cross-spawn-cb');

describe('exports .cjs', () => {
  it('exports on default', () => {
    assert.equal(typeof spawn, 'function');
    assert.equal(typeof spawn.worker, 'function');
    assert.equal(typeof spawn.sync, 'function');
    assert.equal(typeof spawn.sync.worker, 'function');
    assert.equal(typeof spawn.crossSpawn, 'function');
    assert.equal(typeof spawn.crossSpawn._parse, 'function');
    assert.equal(typeof spawn.crossSpawn._enoent, 'object');
  });
});
