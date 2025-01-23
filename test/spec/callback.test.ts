import assert from 'assert';

import Pinkie from 'pinkie-promise';

import spawn from 'cross-spawn-cb';
// @ts-ignore
import { crossSpawn } from 'cross-spawn-cb';

describe('callback', () => {
  describe('happy path', () => {
    it('returns a status code', (done) => {
      spawn('ls', [], {}, (err, res) => {
        if (err) return done(err.message);
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdio inherit', (done) => {
      spawn('ls', [], { stdio: 'inherit' }, (err, res) => {
        if (err) return done(err.message);
        assert.equal(res.stdout, null);
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdout string', (done) => {
      spawn('ls', [], { encoding: 'utf8' }, (err, res) => {
        if (err) return done(err.message);
        assert.equal(typeof res.stdout, 'string');
        assert.equal(res.status, 0);
        done();
      });
    });

    it('stdout string (manual)', (done) => {
      const cp = crossSpawn('ls', [], { encoding: 'utf8' });
      spawn.worker(cp, { encoding: 'utf8' }, (err, res) => {
        if (err) return done(err.message);
        assert.equal(typeof res.stdout, 'string');
        assert.equal(res.status, 0);
        done();
      });
    });
  });

  describe('happy path - promise', () => {
    (() => {
      // patch and restore promise
      // @ts-ignore
      let rootPromise: Promise;
      before(() => {
        rootPromise = global.Promise;
        global.Promise = Pinkie;
      });
      after(() => {
        global.Promise = rootPromise;
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
