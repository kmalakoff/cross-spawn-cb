// remove NODE_OPTIONS from ts-dev-stack
delete process.env.NODE_OPTIONS;

const assert = require('assert');

const spawn = require('../..');

describe('callback', () => {
  describe('happy path', () => {
    it('returns a status code', (done) => {
      spawn('ls', [], {}, (err, res) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdio inherit', (done) => {
      spawn('ls', [], { stdio: 'inherit' }, (err, res) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(res.stdout, null);
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdout string', (done) => {
      spawn('ls', [], { encoding: 'utf8' }, (err, res) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(typeof res.stdout, 'string');
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdout string (manual)', (done) => {
      const options = { encoding: 'utf8' };
      const cp = spawn.spawn('ls', [], options);
      spawn.worker(cp, options, (err, res) => {
        assert.ok(!err, err ? err.message : '');
        assert.equal(typeof res.stdout, 'string');
        assert.equal(res.status, 0);
        done();
      });
    });
  });

  describe('unhappy path', () => {
    it('stdio inherit', (done) => {
      spawn('ls', ['junk'], { stdio: 'inherit' }, (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('stderr string', (done) => {
      spawn('ls', ['junk'], { encoding: 'utf8' }, (err, res) => {
        assert.ok(!res);
        assert.ok(!!err);
        assert.ok(typeof err.status === 'number');
        assert.ok(err.status !== 0);
        assert.equal(typeof err.stderr, 'string');
        done();
      });
    });
  });
});
