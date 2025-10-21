import assert from 'assert';
import spawn, { crossSpawn } from 'cross-spawn-cb';
import Pinkie from 'pinkie-promise';

describe('callback', () => {
  describe('happy path', () => {
    it('returns a status code', (done) => {
      spawn('ls', [], {}, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdio inherit', (done) => {
      spawn('ls', [], { stdio: 'inherit' }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.equal(res.stdout, null);
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdout string', (done) => {
      spawn('ls', [], { encoding: 'utf8' }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.equal(typeof res.stdout, 'string');
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdout string (manual)', (done) => {
      const cp = crossSpawn('ls', [], { encoding: 'utf8' });
      spawn.worker(cp, { encoding: 'utf8' }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.equal(typeof res.stdout, 'string');
        assert.equal(res.status, 0);
        done();
      });
    });
  });

  describe('happy path - promise', () => {
    (() => {
      // patch and restore promise
      if (typeof global === 'undefined') return;
      const globalPromise = global.Promise;
      before(() => {
        global.Promise = Pinkie;
      });
      after(() => {
        global.Promise = globalPromise;
      });
    })();

    it('returns a status code', async () => {
      const _res = await spawn('ls', [], {}, (_err, res) => {
        assert.equal(res.status, 0);
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
