function objectAssign(target, obj) {
  for (var key in obj) {
    if (!target.hasOwnProperty(key)) target[key] = obj[key];
  }
  return target;
}

function findKey(obj, fn) {
  for (var key in obj) {
    if (fn(key)) return key;
  }
  return null
}

var pathDelimiter = process.platform === 'win32' ? ';' : ':';
