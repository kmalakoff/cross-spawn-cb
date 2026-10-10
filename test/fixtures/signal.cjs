process.stdout.write('owned-signal-stdout\n', function () {
  process.stderr.write('owned-signal-stderr\n', function () {
    require('child_process').spawn(process.execPath, ['-e', 'process.kill(' + process.pid + ', "SIGKILL")'], { stdio: 'ignore' });
    setInterval(function () {}, 1000);
  });
});
