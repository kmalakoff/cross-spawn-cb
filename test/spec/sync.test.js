// remove NODE_OPTIONS from ts-dev-stack
// biome-ignore lint/performance/noDelete: <explanation>
delete process.env.NODE_OPTIONS;

const assert = require('assert');

const spawnCallback = require('../..');
const spawnCallbackSync = spawnCallback.sync;

describe('sync', () => {
  describe('happy path', () => {
    it('returns a status code', () => {
      try {
        const res = spawnCallbackSync('ls', [], {});
        assert.equal(res.status, 0);
      } catch (err) {
        assert.ok(!err);
      }
    });

    it('stdio inherit', () => {
      try {
        const res = spawnCallbackSync('ls', [], { stdio: 'inherit' });
        assert.equal(res.stdout, null);
      } catch (err) {
        assert.ok(!err);
      }
    });

    it('stdout string', () => {
      try {
        const res = spawnCallbackSync('ls', [], { encoding: 'utf8' });
        assert.equal(typeof res.stdout, 'string');
      } catch (err) {
        console.log(err);
        assert.ok(!err);
      }
    });

    it('stdout string (manual)', () => {
      try {
        const spawn = spawnCallback.spawn;
        const options = { encoding: 'utf8' };
        let res = spawn.sync('ls', [], options);
        res = spawnCallbackSync.normalize(res, options);
        assert.equal(typeof res.stdout, 'string');
      } catch (err) {
        console.log(err);
        assert.ok(!err);
      }
    });
  });

  describe('unhappy path', function () {
    this.timeout(20000);
    it('stdio inherit', () => {
      try {
        spawnCallbackSync('ls', ['junk'], { stdio: 'inherit' });
        assert.ok(false);
      } catch (err) {
        assert.ok(!!err);
      }
    });

    it('stderr string', () => {
      try {
        spawnCallbackSync('ls', ['junk'], { encoding: 'utf8' });
        assert.ok(false);
      } catch (err) {
        console.log(err);
        assert.equal(typeof err.stderr, 'string');
      }
    });
  });
});
