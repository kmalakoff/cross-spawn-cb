var assert = require('assert');

var spawn = require('../..');

describe('cli', function () {
  it('basic command', function (done) {
    spawn('node', ['--version'], { stdio: 'inherit' }, function (err, res) {
      assert.ok(!err);
      assert.equal(res.exitCode, 0);
      done();
    });
  });
});
