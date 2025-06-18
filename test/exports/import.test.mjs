import assert from 'assert';
import * as spawnStar from 'cross-spawn-cb';
import spawn, { crossSpawn, sync } from 'cross-spawn-cb';

describe('exports .mjs', () => {
  it('exports on default', () => {
    assert.equal(typeof spawn, 'function');
    assert.equal(typeof spawn.worker, 'function');
    assert.equal(typeof spawn.sync, 'function');
    assert.equal(typeof spawn.sync.worker, 'function');
    assert.equal(typeof spawn.crossSpawn, 'function');
    assert.equal(typeof spawn.crossSpawn._parse, 'function');
    assert.equal(typeof spawn.crossSpawn._enoent, 'object');
  });

  it('direct exports', () => {
    assert.equal(typeof spawnStar.default, 'function');
    assert.equal(typeof spawnStar.default.worker, 'function');
    assert.equal(typeof sync, 'function');
    assert.equal(typeof sync.worker, 'function');
    assert.equal(typeof crossSpawn, 'function');
    assert.equal(typeof crossSpawn._parse, 'function');
    assert.equal(typeof crossSpawn._enoent, 'object');
  });
});
