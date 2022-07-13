var assert = require('assert');

var spawn = require('../..');

describe('callback', function () {
  describe('happy path', function () {
    it('stdio inherit', function (done) {
      spawn('ls', [], { stdio: 'inherit' }, function (err, res) {
        assert.ok(!err);
        assert.equal(res.stdout, null);
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdout string', function (done) {
      spawn('ls', [], { encoding: 'utf8' }, function (err, res) {
        assert.ok(!err);
        assert.equal(typeof res.stdout, 'string');
        assert.equal(res.status, 0);
        done();
      });
    });
  });

  describe('unhappy path', function () {
    it('stdio inherit', function (done) {
      spawn('ls', ['junk'], { stdio: 'inherit' }, function (err) {
        assert.ok(!!err);
        done();
      });
    });

    it('stderr string', function (done) {
      spawn('ls', ['junk'], { encoding: 'utf8' }, function (err) {
        assert.ok(!!err);
        assert.equal(typeof err.stderr, 'string');
        done();
      });
    });
  });
});
