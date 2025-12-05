import assert from 'assert';
import spawn, { crossSpawn } from 'cross-spawn-cb';

describe('_parse', () => {
  describe('happy path', () => {
    it('parses', (done) => {
      const parsed = crossSpawn._parse('ls', ['-la'], { cwd: process.cwd(), env: process.env });
      assert.equal(typeof parsed.command, 'string');
      assert.equal(typeof parsed.args[0], 'string');
      assert.equal(typeof parsed.options.cwd, 'string');
      assert.equal(typeof parsed.options.env, 'object');

      spawn(parsed.command, parsed.args, parsed.options, (err, res) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(res.status, 0);
        done();
      });
    });
  });
});
