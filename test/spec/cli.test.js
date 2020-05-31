var assert = require('assert');

var spawn = require('../..');

describe('cli', function () {
  describe('happy path', function () {
    it('stdio inherit', function (done) {
      spawn('node', ['--version'], { stdio: 'inherit' }, function (err, res) {
        assert.ok(!err);
        assert.equal(typeof res.stdout, 'undefined');
        done();
      });
    });

    it('stdout string', function (done) {
      spawn('node', ['--version'], { stdout: 'string' }, function (err, res) {
        assert.ok(!err);
        assert.equal(typeof res.stdout, 'string');
        done();
      });
    });
  });

  describe('unhappy path', function () {
    it('stdio inherit', function (done) {
      spawn('node', ['--versio'], { stdio: 'inherit' }, function (err) {
        assert.ok(err);
        done();
      });
    });

    it('stdout string', function (done) {
      spawn('node', ['--versio'], { stderr: 'string' }, function (err) {
        assert.ok(err);
        assert.equal(typeof err.stderr, 'string');
        done();
      });
    });
  });
});
