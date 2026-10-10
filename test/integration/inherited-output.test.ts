import assert from 'assert';
import childProcess from 'child_process';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const fixture = path.join(__dirname, '..', 'fixtures', 'inherit.cjs');

describe('inherited output', () => {
  ['callback', 'sync'].forEach((mode) => {
    [0, 7].forEach((status) => {
      it(`${mode} reports inherited output for exit ${status}`, (done) => {
        childProcess.execFile(process.execPath, [fixture, mode, String(status)], (error, stdout, stderr) => {
          if (error) return done(error);
          // The callback-backed sync fallback throws before forwarding failed output.
          const capturedFailure = mode === 'sync' && status !== 0 && typeof childProcess.spawnSync !== 'function';
          assert.strictEqual(stdout, capturedFailure ? '' : 'inherited-stdout\n');
          assert.strictEqual(stderr, capturedFailure ? '' : 'inherited-stderr\n');
          done();
        });
      });
    });
  });
});
