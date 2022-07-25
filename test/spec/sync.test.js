var assert = require('assert');

var spawnSync = require('../..').sync;

describe('sync', function () {
  describe('happy path', function () {
    it('stdio inherit', function () {
      try {
        var res = spawnSync('ls', [], { stdio: 'inherit' });
        assert.equal(res.stdout, null);
      } catch (err) {
        console.log(err);
        assert.ok(!err);
      }
    });

    it('stdout string', function () {
      try {
        var res = spawnSync('ls', [], { stdio: 'string' });
        assert.equal(typeof res.stdout, 'string');
      } catch (err) {
        assert.ok(!err);
      }
    });
  });

  describe('unhappy path', function () {
    it('stdio inherit', function () {
      try {
        spawnSync('ls', ['junk'], { stdio: 'inherit' });
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('stderr string', function () {
      try {
        var res = spawnSync('ls', ['junk'], { stderr: 'string' });
        console.log(res)
        assert.ok(false);
      } catch (err) {
        console.log(err)
        assert.ok(!!err);
        assert.equal(typeof err.stderr, 'string');
      }
    });
  });
});
