var assert = require('assert');

var spawn = require('../..');

describe('cli', function () {
  it('stdio inherit', function (done) {
    spawn('node', ['--version'], { stdio: 'inherit' }, function (err, res) {
      assert.ok(!err);
      assert.equal(res.code, 0);
      assert.equal(typeof res.stdout, 'undefined');
      done();
    });
  });

  it('stdout string', function (done) {
    spawn('node', ['--version'], { stdout: 'string' }, function (err, res) {
      assert.ok(!err);
      assert.equal(res.code, 0);
      assert.equal(typeof res.stdout, 'string');
      done();
    });
  });
});
