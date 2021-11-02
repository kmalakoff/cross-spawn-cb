var assert = require('assert');

var spawnSync = require('../..').sync;

describe('sync', function () {
  describe('happy path', function () {
    it('stdio inherit', function (done) {
      try {
        var res = spawnSync('ls', [], { stdio: 'inherit' });
        assert.equal(res.stdout, null);
      } catch (err) {
        assert.ok(!err);
      }
      done();
    });

    it('stdout string', function (done) {
      try {
        var res = spawnSync('ls', [], { stdio: 'string' });
        assert.equal(typeof res.stdout, 'string');
      } catch (err) {
        assert.ok(!err);
      }
      done();
    });
  });

  describe('unhappy path', function () {
    it('stdio inherit', function (done) {
      try {
        spawnSync('ls', ['junk'], { stdio: 'inherit' });
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
      done();
    });

    it('stderr string', function (done) {
      try {
        var res = spawnSync('ls', ['junk'], { stderr: 'string' });
        //        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
        assert.equal(typeof err.stderr, 'string');
      }
      done();
    });
  });
});
