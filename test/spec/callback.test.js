// remove NODE_OPTIONS from ts-dev-stack
// biome-ignore lint/performance/noDelete: <explanation>
delete process.env.NODE_OPTIONS;

const assert = require('assert');

const spawnCallback = require('../..');

describe('callback', () => {
  describe('happy path', () => {
    it('returns a status code', (done) => {
      spawnCallback('ls', [], {}, (err, res) => {
        assert.ok(!err);
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdio inherit', (done) => {
      spawnCallback('ls', [], { stdio: 'inherit' }, (err, res) => {
        assert.ok(!err);
        assert.equal(res.stdout, null);
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdout string', (done) => {
      spawnCallback('ls', [], { encoding: 'utf8' }, (err, res) => {
        assert.ok(!err);
        assert.equal(typeof res.stdout, 'string');
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdout string (manual)', (done) => {
      const spawn = spawnCallback.spawn;
      const options = { encoding: 'utf8' };
      const cp = spawn('ls', [], options);
      spawnCallback.normalize(cp, options, (err, res) => {
        assert.ok(!err);
        assert.equal(typeof res.stdout, 'string');
        assert.equal(res.status, 0);
        done();
      });
    });
  });

  describe('unhappy path', () => {
    it('stdio inherit', (done) => {
      spawnCallback('ls', ['junk'], { stdio: 'inherit' }, (err) => {
        assert.ok(!!err);
        done();
      });
    });

    it('stderr string', (done) => {
      spawnCallback('ls', ['junk'], { encoding: 'utf8' }, (err) => {
        assert.ok(!!err);
        assert.equal(typeof err.stderr, 'string');
        done();
      });
    });
  });
});
