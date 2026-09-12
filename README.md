## cross-spawn-cb

Cross spawn with a completion callback

```bash
npm install cross-spawn-cb
```

```
var assert = require('assert');
var spawn = require('cross-spawn-cb');

spawn(process.execPath, ['--version'], { encoding: 'utf8' }, function (err, res) {
  if (err) throw err;
  console.log(res.status, res.stdout.trim());
});
```
