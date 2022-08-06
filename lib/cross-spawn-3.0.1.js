'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});

var require$$0$2 = require('child_process');

var require$$0 = require('fs');

var require$$1 = require('util');

var require$$0$1 = require('path');

function _interopDefaultLegacy(e) {
  return e && _typeof(e) === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
var crossSpawn = {
  exports: {}
};
var map = {
  exports: {}
};
var pseudomap;
var hasRequiredPseudomap;

function requirePseudomap() {
  if (hasRequiredPseudomap) return pseudomap;
  hasRequiredPseudomap = 1;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  pseudomap = PseudoMap;

  function PseudoMap(set) {
    if (!(this instanceof PseudoMap)) // whyyyyyyy
      throw new TypeError("Constructor PseudoMap requires 'new'");
    this.clear();

    if (set) {
      if (set instanceof PseudoMap || typeof Map === 'function' && set instanceof Map) set.forEach(function (value, key) {
        this.set(key, value);
      }, this);else if (Array.isArray(set)) set.forEach(function (kv) {
        this.set(kv[0], kv[1]);
      }, this);else throw new TypeError('invalid argument');
    }
  }

  PseudoMap.prototype.forEach = function (fn, thisp) {
    thisp = thisp || this;
    Object.keys(this._data).forEach(function (k) {
      if (k !== 'size') fn.call(thisp, this._data[k].value, this._data[k].key);
    }, this);
  };

  PseudoMap.prototype.has = function (k) {
    return !!find(this._data, k);
  };

  PseudoMap.prototype.get = function (k) {
    var res = find(this._data, k);
    return res && res.value;
  };

  PseudoMap.prototype.set = function (k, v) {
    set(this._data, k, v);
  };

  PseudoMap.prototype["delete"] = function (k) {
    var res = find(this._data, k);

    if (res) {
      delete this._data[res._index];
      this._data.size--;
    }
  };

  PseudoMap.prototype.clear = function () {
    var data = Object.create(null);
    data.size = 0;
    Object.defineProperty(this, '_data', {
      value: data,
      enumerable: false,
      configurable: true,
      writable: false
    });
  };

  Object.defineProperty(PseudoMap.prototype, 'size', {
    get: function get() {
      return this._data.size;
    },
    set: function set(n) {},
    enumerable: true,
    configurable: true
  });

  PseudoMap.prototype.values = PseudoMap.prototype.keys = PseudoMap.prototype.entries = function () {
    throw new Error('iterators are not implemented in this version');
  }; // Either identical, or both NaN


  function same(a, b) {
    return a === b || a !== a && b !== b;
  }

  function Entry(k, v, i) {
    this.key = k;
    this.value = v;
    this._index = i;
  }

  function find(data, k) {
    for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
      if (same(data[key].key, k)) return data[key];
    }
  }

  function set(data, k, v) {
    for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
      if (same(data[key].key, k)) {
        data[key].value = v;
        return;
      }
    }

    data.size++;
    data[key] = new Entry(k, v, key);
  }

  return pseudomap;
}

(function (module) {
  if (process.env.npm_package_name === 'pseudomap' && process.env.npm_lifecycle_script === 'test') process.env.TEST_PSEUDOMAP = 'true';

  if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
    module.exports = Map;
  } else {
    module.exports = requirePseudomap();
  }
})(map);

var yallist = Yallist$1;
Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;

function Yallist$1(list) {
  var self = this;

  if (!(self instanceof Yallist$1)) {
    self = new Yallist$1();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self;
}

Yallist$1.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list');
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }

  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
};

Yallist$1.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;

  if (head) {
    head.prev = node;
  }

  this.head = node;

  if (!this.tail) {
    this.tail = node;
  }

  this.length++;
};

Yallist$1.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;

  if (tail) {
    tail.next = node;
  }

  this.tail = node;

  if (!this.head) {
    this.head = node;
  }

  this.length++;
};

Yallist$1.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }

  return this.length;
};

Yallist$1.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }

  return this.length;
};

Yallist$1.prototype.pop = function () {
  if (!this.tail) {
    return undefined;
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;

  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }

  this.length--;
  return res;
};

Yallist$1.prototype.shift = function () {
  if (!this.head) {
    return undefined;
  }

  var res = this.head.value;
  this.head = this.head.next;

  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }

  this.length--;
  return res;
};

Yallist$1.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist$1.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist$1.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist$1.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist$1.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();

  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }

  return res;
};

Yallist$1.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();

  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }

  return res;
};

Yallist$1.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc;
};

Yallist$1.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc;
};

Yallist$1.prototype.toArray = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }

  return arr;
};

Yallist$1.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }

  return arr;
};

Yallist$1.prototype.slice = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist$1();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }

  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist$1.prototype.sliceReverse = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist$1();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }

  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist$1.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;

  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }

  this.head = tail;
  this.tail = head;
  return this;
};

function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);

  if (!self.head) {
    self.head = self.tail;
  }

  self.length++;
}

function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);

  if (!self.tail) {
    self.tail = self.head;
  }

  self.length++;
}

function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

var lruCache = LRUCache; // This will be a proper iterable 'Map' in engines that support it,
// or a fakey-fake PseudoMap in older versions.

var Map$1 = map.exports;
var util = require$$1__default["default"]; // A linked list to keep track of recently-used-ness

var Yallist = yallist; // use symbols if possible, otherwise just _props

var hasSymbol = typeof Symbol === 'function' && process.env._nodeLRUCacheForceNoSymbol !== '1';
var makeSymbol;

if (hasSymbol) {
  makeSymbol = function makeSymbol(key) {
    return Symbol(key);
  };
} else {
  makeSymbol = function makeSymbol(key) {
    return '_' + key;
  };
}

var MAX = makeSymbol('max');
var LENGTH = makeSymbol('length');
var LENGTH_CALCULATOR = makeSymbol('lengthCalculator');
var ALLOW_STALE = makeSymbol('allowStale');
var MAX_AGE = makeSymbol('maxAge');
var DISPOSE = makeSymbol('dispose');
var NO_DISPOSE_ON_SET = makeSymbol('noDisposeOnSet');
var LRU_LIST = makeSymbol('lruList');
var CACHE = makeSymbol('cache');

function naiveLength() {
  return 1;
} // lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.


function LRUCache(options) {
  if (!(this instanceof LRUCache)) {
    return new LRUCache(options);
  }

  if (typeof options === 'number') {
    options = {
      max: options
    };
  }

  if (!options) {
    options = {};
  }

  var max = this[MAX] = options.max; // Kind of weird to have a default max of Infinity, but oh well.

  if (!max || !(typeof max === 'number') || max <= 0) {
    this[MAX] = Infinity;
  }

  var lc = options.length || naiveLength;

  if (typeof lc !== 'function') {
    lc = naiveLength;
  }

  this[LENGTH_CALCULATOR] = lc;
  this[ALLOW_STALE] = options.stale || false;
  this[MAX_AGE] = options.maxAge || 0;
  this[DISPOSE] = options.dispose;
  this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
  this.reset();
} // resize the cache when the max changes.


Object.defineProperty(LRUCache.prototype, 'max', {
  set: function set(mL) {
    if (!mL || !(typeof mL === 'number') || mL <= 0) {
      mL = Infinity;
    }

    this[MAX] = mL;
    trim(this);
  },
  get: function get() {
    return this[MAX];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'allowStale', {
  set: function set(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  },
  get: function get() {
    return this[ALLOW_STALE];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'maxAge', {
  set: function set(mA) {
    if (!mA || !(typeof mA === 'number') || mA < 0) {
      mA = 0;
    }

    this[MAX_AGE] = mA;
    trim(this);
  },
  get: function get() {
    return this[MAX_AGE];
  },
  enumerable: true
}); // resize the cache when the lengthCalculator changes.

Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
  set: function set(lC) {
    if (typeof lC !== 'function') {
      lC = naiveLength;
    }

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(function (hit) {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      }, this);
    }

    trim(this);
  },
  get: function get() {
    return this[LENGTH_CALCULATOR];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'length', {
  get: function get() {
    return this[LENGTH];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'itemCount', {
  get: function get() {
    return this[LRU_LIST].length;
  },
  enumerable: true
});

LRUCache.prototype.rforEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this[LRU_LIST].tail; walker !== null;) {
    var prev = walker.prev;
    forEachStep(this, fn, walker, thisp);
    walker = prev;
  }
};

function forEachStep(self, fn, node, thisp) {
  var hit = node.value;

  if (isStale(self, hit)) {
    del(self, node);

    if (!self[ALLOW_STALE]) {
      hit = undefined;
    }
  }

  if (hit) {
    fn.call(thisp, hit.value, hit.key, self);
  }
}

LRUCache.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this[LRU_LIST].head; walker !== null;) {
    var next = walker.next;
    forEachStep(this, fn, walker, thisp);
    walker = next;
  }
};

LRUCache.prototype.keys = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.key;
  }, this);
};

LRUCache.prototype.values = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.value;
  }, this);
};

LRUCache.prototype.reset = function () {
  if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
    this[LRU_LIST].forEach(function (hit) {
      this[DISPOSE](hit.key, hit.value);
    }, this);
  }

  this[CACHE] = new Map$1(); // hash of items by key

  this[LRU_LIST] = new Yallist(); // list of items in order of use recency

  this[LENGTH] = 0; // length of items in the list
};

LRUCache.prototype.dump = function () {
  return this[LRU_LIST].map(function (hit) {
    if (!isStale(this, hit)) {
      return {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      };
    }
  }, this).toArray().filter(function (h) {
    return h;
  });
};

LRUCache.prototype.dumpLru = function () {
  return this[LRU_LIST];
};
/* istanbul ignore next */


LRUCache.prototype.inspect = function (n, opts) {
  var str = 'LRUCache {';
  var extras = false;
  var as = this[ALLOW_STALE];

  if (as) {
    str += '\n  allowStale: true';
    extras = true;
  }

  var max = this[MAX];

  if (max && max !== Infinity) {
    if (extras) {
      str += ',';
    }

    str += '\n  max: ' + util.inspect(max, opts);
    extras = true;
  }

  var maxAge = this[MAX_AGE];

  if (maxAge) {
    if (extras) {
      str += ',';
    }

    str += '\n  maxAge: ' + util.inspect(maxAge, opts);
    extras = true;
  }

  var lc = this[LENGTH_CALCULATOR];

  if (lc && lc !== naiveLength) {
    if (extras) {
      str += ',';
    }

    str += '\n  length: ' + util.inspect(this[LENGTH], opts);
    extras = true;
  }

  var didFirst = false;
  this[LRU_LIST].forEach(function (item) {
    if (didFirst) {
      str += ',\n  ';
    } else {
      if (extras) {
        str += ',\n';
      }

      didFirst = true;
      str += '\n  ';
    }

    var key = util.inspect(item.key).split('\n').join('\n  ');
    var val = {
      value: item.value
    };

    if (item.maxAge !== maxAge) {
      val.maxAge = item.maxAge;
    }

    if (lc !== naiveLength) {
      val.length = item.length;
    }

    if (isStale(this, item)) {
      val.stale = true;
    }

    val = util.inspect(val, opts).split('\n').join('\n  ');
    str += key + ' => ' + val;
  });

  if (didFirst || extras) {
    str += '\n';
  }

  str += '}';
  return str;
};

LRUCache.prototype.set = function (key, value, maxAge) {
  maxAge = maxAge || this[MAX_AGE];
  var now = maxAge ? Date.now() : 0;
  var len = this[LENGTH_CALCULATOR](value, key);

  if (this[CACHE].has(key)) {
    if (len > this[MAX]) {
      del(this, this[CACHE].get(key));
      return false;
    }

    var node = this[CACHE].get(key);
    var item = node.value; // dispose of the old one before overwriting
    // split out into 2 ifs for better coverage tracking

    if (this[DISPOSE]) {
      if (!this[NO_DISPOSE_ON_SET]) {
        this[DISPOSE](key, item.value);
      }
    }

    item.now = now;
    item.maxAge = maxAge;
    item.value = value;
    this[LENGTH] += len - item.length;
    item.length = len;
    this.get(key);
    trim(this);
    return true;
  }

  var hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

  if (hit.length > this[MAX]) {
    if (this[DISPOSE]) {
      this[DISPOSE](key, value);
    }

    return false;
  }

  this[LENGTH] += hit.length;
  this[LRU_LIST].unshift(hit);
  this[CACHE].set(key, this[LRU_LIST].head);
  trim(this);
  return true;
};

LRUCache.prototype.has = function (key) {
  if (!this[CACHE].has(key)) return false;
  var hit = this[CACHE].get(key).value;

  if (isStale(this, hit)) {
    return false;
  }

  return true;
};

LRUCache.prototype.get = function (key) {
  return get(this, key, true);
};

LRUCache.prototype.peek = function (key) {
  return get(this, key, false);
};

LRUCache.prototype.pop = function () {
  var node = this[LRU_LIST].tail;
  if (!node) return null;
  del(this, node);
  return node.value;
};

LRUCache.prototype.del = function (key) {
  del(this, this[CACHE].get(key));
};

LRUCache.prototype.load = function (arr) {
  // reset the cache
  this.reset();
  var now = Date.now(); // A previous serialized cache has the most recent items first

  for (var l = arr.length - 1; l >= 0; l--) {
    var hit = arr[l];
    var expiresAt = hit.e || 0;

    if (expiresAt === 0) {
      // the item was created without expiration in a non aged cache
      this.set(hit.k, hit.v);
    } else {
      var maxAge = expiresAt - now; // dont add already expired items

      if (maxAge > 0) {
        this.set(hit.k, hit.v, maxAge);
      }
    }
  }
};

LRUCache.prototype.prune = function () {
  var self = this;
  this[CACHE].forEach(function (value, key) {
    get(self, key, false);
  });
};

function get(self, key, doUse) {
  var node = self[CACHE].get(key);

  if (node) {
    var hit = node.value;

    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) hit = undefined;
    } else {
      if (doUse) {
        self[LRU_LIST].unshiftNode(node);
      }
    }

    if (hit) hit = hit.value;
  }

  return hit;
}

function isStale(self, hit) {
  if (!hit || !hit.maxAge && !self[MAX_AGE]) {
    return false;
  }

  var stale = false;
  var diff = Date.now() - hit.now;

  if (hit.maxAge) {
    stale = diff > hit.maxAge;
  } else {
    stale = self[MAX_AGE] && diff > self[MAX_AGE];
  }

  return stale;
}

function trim(self) {
  if (self[LENGTH] > self[MAX]) {
    for (var walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      var prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
}

function del(self, node) {
  if (node) {
    var hit = node.value;

    if (self[DISPOSE]) {
      self[DISPOSE](hit.key, hit.value);
    }

    self[LENGTH] -= hit.length;
    self[CACHE]["delete"](hit.key);
    self[LRU_LIST].removeNode(node);
  }
} // classy, since V8 prefers predictable objects.


function Entry(key, value, length, now, maxAge) {
  this.key = key;
  this.value = value;
  this.length = length;
  this.now = now;
  this.maxAge = maxAge || 0;
}

var windows;
var hasRequiredWindows;

function requireWindows() {
  if (hasRequiredWindows) return windows;
  hasRequiredWindows = 1;
  windows = isexe;
  isexe.sync = sync;
  var fs = require$$0__default["default"];

  function checkPathExt(path, options) {
    var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;

    if (!pathext) {
      return true;
    }

    pathext = pathext.split(';');

    if (pathext.indexOf('') !== -1) {
      return true;
    }

    for (var i = 0; i < pathext.length; i++) {
      var p = pathext[i].toLowerCase();

      if (p && path.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }

    return false;
  }

  function checkStat(stat, path, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }

    return checkPathExt(path, options);
  }

  function isexe(path, options, cb) {
    fs.stat(path, function (er, stat) {
      cb(er, er ? false : checkStat(stat, path, options));
    });
  }

  function sync(path, options) {
    return checkStat(fs.statSync(path), path, options);
  }

  return windows;
}

var mode;
var hasRequiredMode;

function requireMode() {
  if (hasRequiredMode) return mode;
  hasRequiredMode = 1;
  mode = isexe;
  isexe.sync = sync;
  var fs = require$$0__default["default"];

  function isexe(path, options, cb) {
    fs.stat(path, function (er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  }

  function sync(path, options) {
    return checkStat(fs.statSync(path), options);
  }

  function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  }

  function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();
    var u = parseInt('100', 8);
    var g = parseInt('010', 8);
    var o = parseInt('001', 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
  }

  return mode;
}

var core;

if (process.platform === 'win32' || commonjsGlobal.TESTING_WINDOWS) {
  core = requireWindows();
} else {
  core = requireMode();
}

var isexe_1 = isexe$1;
isexe$1.sync = sync$1;

function isexe$1(path, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided');
    }

    return new Promise(function (resolve, reject) {
      isexe$1(path, options || {}, function (er, is) {
        if (er) {
          reject(er);
        } else {
          resolve(is);
        }
      });
    });
  }

  core(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null;
        is = false;
      }
    }

    cb(er, is);
  });
}

function sync$1(path, options) {
  // my kingdom for a filtered catch
  try {
    return core.sync(path, options || {});
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false;
    } else {
      throw er;
    }
  }
}

var which_1 = which$1;
which$1.sync = whichSync;
var isWindows = process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys';
var path$1 = require$$0__default$1["default"];
var COLON = isWindows ? ';' : ':';
var isexe = isexe_1;

function getNotFoundError(cmd) {
  var er = new Error('not found: ' + cmd);
  er.code = 'ENOENT';
  return er;
}

function getPathInfo(cmd, opt) {
  var colon = opt.colon || COLON;
  var pathEnv = opt.path || process.env.PATH || '';
  var pathExt = [''];
  pathEnv = pathEnv.split(colon);
  var pathExtExe = '';

  if (isWindows) {
    pathEnv.unshift(process.cwd());
    pathExtExe = opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM';
    pathExt = pathExtExe.split(colon); // Always test the cmd itself first.  isexe will check to make sure
    // it's found in the pathExt set.

    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '') pathExt.unshift('');
  } // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.


  if (cmd.match(/\//) || isWindows && cmd.match(/\\/)) pathEnv = [''];
  return {
    env: pathEnv,
    ext: pathExt,
    extExe: pathExtExe
  };
}

function which$1(cmd, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt;
    opt = {};
  }

  var info = getPathInfo(cmd, opt);
  var pathEnv = info.env;
  var pathExt = info.ext;
  var pathExtExe = info.extExe;
  var found = [];

  (function F(i, l) {
    if (i === l) {
      if (opt.all && found.length) return cb(null, found);else return cb(getNotFoundError(cmd));
    }

    var pathPart = pathEnv[i];
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);
    var p = path$1.join(pathPart, cmd);

    if (!pathPart && /^\.[\\\/]/.test(cmd)) {
      p = cmd.slice(0, 2) + p;
    }

    (function E(ii, ll) {
      if (ii === ll) return F(i + 1, l);
      var ext = pathExt[ii];
      isexe(p + ext, {
        pathExt: pathExtExe
      }, function (er, is) {
        if (!er && is) {
          if (opt.all) found.push(p + ext);else return cb(null, p + ext);
        }

        return E(ii + 1, ll);
      });
    })(0, pathExt.length);
  })(0, pathEnv.length);
}

function whichSync(cmd, opt) {
  opt = opt || {};
  var info = getPathInfo(cmd, opt);
  var pathEnv = info.env;
  var pathExt = info.ext;
  var pathExtExe = info.extExe;
  var found = [];

  for (var i = 0, l = pathEnv.length; i < l; i++) {
    var pathPart = pathEnv[i];
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);
    var p = path$1.join(pathPart, cmd);

    if (!pathPart && /^\.[\\\/]/.test(cmd)) {
      p = cmd.slice(0, 2) + p;
    }

    for (var j = 0, ll = pathExt.length; j < ll; j++) {
      var cur = p + pathExt[j];
      var is;

      try {
        is = isexe.sync(cur, {
          pathExt: pathExtExe
        });

        if (is) {
          if (opt.all) found.push(cur);else return cur;
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length) return found;
  if (opt.nothrow) return null;
  throw getNotFoundError(cmd);
}

var path = require$$0__default$1["default"];
var which = which_1;
var LRU$1 = lruCache;
var commandCache = new LRU$1({
  max: 50,
  maxAge: 30 * 1000
}); // Cache just for 30sec

function resolveCommand$2(command, noExtension) {
  var resolved;
  noExtension = !!noExtension;
  resolved = commandCache.get(command + '!' + noExtension); // Check if its resolved in the cache

  if (commandCache.has(command)) {
    return commandCache.get(command);
  }

  try {
    resolved = !noExtension ? which.sync(command) : which.sync(command, {
      pathExt: path.delimiter + (process.env.PATHEXT || '')
    });
  } catch (e) {
    /* empty */
  }

  commandCache.set(command + '!' + noExtension, resolved);
  return resolved;
}

var resolveCommand_1 = resolveCommand$2;
var fs = require$$0__default["default"];
var LRU = lruCache;
var resolveCommand$1 = resolveCommand_1;
var isWin$1 = process.platform === 'win32';
var shebangCache = new LRU({
  max: 50,
  maxAge: 30 * 1000
}); // Cache just for 30sec

function readShebang(command) {
  var buffer;
  var fd;
  var match;
  var shebang; // Check if it is in the cache first

  if (shebangCache.has(command)) {
    return shebangCache.get(command);
  } // Read the first 150 bytes from the file


  buffer = new Buffer(150);

  try {
    fd = fs.openSync(command, 'r');
    fs.readSync(fd, buffer, 0, 150, 0);
    fs.closeSync(fd);
  } catch (e) {
    /* empty */
  } // Check if it is a shebang


  match = buffer.toString().trim().match(/#!(.+)/i);

  if (match) {
    shebang = match[1].replace(/\/usr\/bin\/env\s+/i, ''); // Remove /usr/bin/env
  } // Store the shebang in the cache


  shebangCache.set(command, shebang);
  return shebang;
}

function escapeArg(arg, quote) {
  // Convert to string
  arg = '' + arg; // If we are not going to quote the argument,
  // escape shell metacharacters, including double and single quotes:

  if (!quote) {
    arg = arg.replace(/([\(\)%!\^<>&|;,"'\s])/g, '^$1');
  } else {
    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"'); // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes

    arg = arg.replace(/(\\*)$/, '$1$1'); // All other backslashes occur literally
    // Quote the whole thing:

    arg = '"' + arg + '"';
  }

  return arg;
}

function escapeCommand(command) {
  // Do not escape if this command is not dangerous..
  // We do this so that commands like "echo" or "ifconfig" work
  // Quoting them, will make them unaccessible
  return /^[a-z0-9_-]+$/i.test(command) ? command : escapeArg(command, true);
}

function parse$1(command, args, options) {
  var shebang;
  var applyQuotes;
  var file;
  var original; // Normalize arguments, similar to nodejs

  if (args && !Array.isArray(args)) {
    options = args;
    args = null;
  }

  args = args ? args.slice(0) : []; // Clone array to avoid changing the original

  options = options || {};
  original = command;

  if (isWin$1) {
    // Detect & add support for shebangs
    file = resolveCommand$1(command);
    file = file || resolveCommand$1(command, true);
    shebang = file && readShebang(file);

    if (shebang) {
      args.unshift(file);
      command = shebang;
    } // Escape command & arguments


    applyQuotes = command !== 'echo'; // Do not quote arguments for the special "echo" command

    command = escapeCommand(command);
    args = args.map(function (arg) {
      return escapeArg(arg, applyQuotes);
    }); // Use cmd.exe

    args = ['/s', '/c', '"' + command + (args.length ? ' ' + args.join(' ') : '') + '"'];
    command = process.env.comspec || 'cmd.exe'; // Tell node's spawn that the arguments are already escaped

    options.windowsVerbatimArguments = true;
  }

  return {
    command: command,
    args: args,
    options: options,
    file: file,
    original: original
  };
}

var parse_1 = parse$1;
var enoent$1 = {};
var isWin = process.platform === 'win32';
var resolveCommand = resolveCommand_1;
var isNode10 = process.version.indexOf('v0.10.') === 0;

function notFoundError(command, syscall) {
  var err;
  err = new Error(syscall + ' ' + command + ' ENOENT');
  err.code = err.errno = 'ENOENT';
  err.syscall = syscall + ' ' + command;
  return err;
}

function hookChildProcess(cp, parsed) {
  var originalEmit;

  if (!isWin) {
    return;
  }

  originalEmit = cp.emit;

  cp.emit = function (name, arg1) {
    var err; // If emitting "exit" event and exit code is 1, we need to check if
    // the command exists and emit an "error" instead
    // See: https://github.com/IndigoUnited/node-cross-spawn/issues/16

    if (name === 'exit') {
      err = verifyENOENT(arg1, parsed);

      if (err) {
        return originalEmit.call(cp, 'error', err);
      }
    }

    return originalEmit.apply(cp, arguments);
  };
}

function verifyENOENT(status, parsed) {
  if (isWin && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, 'spawn');
  }

  return null;
}

function verifyENOENTSync(status, parsed) {
  if (isWin && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, 'spawnSync');
  } // If we are in node 10, then we are using spawn-sync; if it exited
  // with -1 it probably means that the command does not exist


  if (isNode10 && status === -1) {
    parsed.file = isWin ? parsed.file : resolveCommand(parsed.original);

    if (!parsed.file) {
      return notFoundError(parsed.original, 'spawnSync');
    }
  }

  return null;
}

enoent$1.hookChildProcess = hookChildProcess;
enoent$1.verifyENOENT = verifyENOENT;
enoent$1.verifyENOENTSync = verifyENOENTSync;
enoent$1.notFoundError = notFoundError;
var cp = require$$0__default$2["default"];
var parse = parse_1;
var enoent = enoent$1;
var cpSpawnSync = cp.spawnSync;

function spawn(command, args, options) {
  var parsed;
  var spawned; // Parse the arguments

  parsed = parse(command, args, options); // Spawn the child process
  console.log('command, args: ', command, args);
  console.log('parsed.command, parsed.args: ', parsed.command, parsed.args);

  spawned = cp.spawn(parsed.command, parsed.args, parsed.options); // Hook into child process "exit" event to emit an error if the command
  // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16

  enoent.hookChildProcess(spawned, parsed);
  return spawned;
}

function spawnSync(command, args, options) {
  var parsed;
  var result;

  if (!cpSpawnSync) {
    try {
      cpSpawnSync = require('spawn-sync'); // eslint-disable-line global-require
    } catch (ex) {
      throw new Error('In order to use spawnSync on node 0.10 or older, you must ' + 'install spawn-sync:\n\n' + '  npm install spawn-sync --save');
    }
  } // Parse the arguments


  parsed = parse(command, args, options); // Spawn the child process

  result = cpSpawnSync(parsed.command, parsed.args, parsed.options); // Analyze if the command does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16

  result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
  return result;
}

crossSpawn.exports = spawn;
var spawn_1 = crossSpawn.exports.spawn = spawn;
var sync = crossSpawn.exports.sync = spawnSync;

var _parse = crossSpawn.exports._parse = parse;

var _enoent = crossSpawn.exports._enoent = enoent;

exports._enoent = _enoent;
exports._parse = _parse;
exports["default"] = crossSpawn.exports;
exports.spawn = spawn_1;
exports.sync = sync;
