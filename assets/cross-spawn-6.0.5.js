'use strict';

var require$$0 = require('buffer');
var require$$0$2 = require('path');
var require$$0$3 = require('child_process');
var require$$6 = require('function-exec-sync');
var require$$0$1 = require('fs');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var es_object_assign = {};

function _type_of$6(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var globalThis_1;
var hasRequiredGlobalThis;
function requireGlobalThis() {
    if (hasRequiredGlobalThis) return globalThis_1;
    hasRequiredGlobalThis = 1;
    var check = function check(it) {
        return it && it.Math === Math && it;
    };
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    globalThis_1 = // eslint-disable-next-line es/no-global-this -- safe
    check((typeof globalThis === "undefined" ? "undefined" : _type_of$6(globalThis)) == 'object' && globalThis) || check((typeof window === "undefined" ? "undefined" : _type_of$6(window)) == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
    check((typeof self === "undefined" ? "undefined" : _type_of$6(self)) == 'object' && self) || check(_type_of$6(commonjsGlobal) == 'object' && commonjsGlobal) || check((typeof globalThis_1 === "undefined" ? "undefined" : _type_of$6(globalThis_1)) == 'object' && globalThis_1) || // eslint-disable-next-line no-new-func -- fallback
    function() {
        return this;
    }() || Function('return this')();
    return globalThis_1;
}

var objectGetOwnPropertyDescriptor = {};

var fails;
var hasRequiredFails;
function requireFails() {
    if (hasRequiredFails) return fails;
    hasRequiredFails = 1;
    fails = function fails(exec) {
        try {
            return !!exec();
        } catch (error) {
            return true;
        }
    };
    return fails;
}

var descriptors;
var hasRequiredDescriptors;
function requireDescriptors() {
    if (hasRequiredDescriptors) return descriptors;
    hasRequiredDescriptors = 1;
    var fails = requireFails();
    // Detect IE8's incomplete defineProperty implementation
    descriptors = !fails(function() {
        // eslint-disable-next-line es/no-object-defineproperty -- required for testing
        return Object.defineProperty({}, 1, {
            get: function get() {
                return 7;
            }
        })[1] !== 7;
    });
    return descriptors;
}

var functionBindNative;
var hasRequiredFunctionBindNative;
function requireFunctionBindNative() {
    if (hasRequiredFunctionBindNative) return functionBindNative;
    hasRequiredFunctionBindNative = 1;
    var fails = requireFails();
    functionBindNative = !fails(function() {
        // eslint-disable-next-line es/no-function-prototype-bind -- safe
        var test = (function() {}).bind();
        // eslint-disable-next-line no-prototype-builtins -- safe
        return typeof test != 'function' || test.hasOwnProperty('prototype');
    });
    return functionBindNative;
}

var functionCall;
var hasRequiredFunctionCall;
function requireFunctionCall() {
    if (hasRequiredFunctionCall) return functionCall;
    hasRequiredFunctionCall = 1;
    var NATIVE_BIND = requireFunctionBindNative();
    var call = Function.prototype.call;
    functionCall = NATIVE_BIND ? call.bind(call) : function functionCall() {
        return call.apply(call, arguments);
    };
    return functionCall;
}

var objectPropertyIsEnumerable = {};

var hasRequiredObjectPropertyIsEnumerable;
function requireObjectPropertyIsEnumerable() {
    if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
    hasRequiredObjectPropertyIsEnumerable = 1;
    var $propertyIsEnumerable = {}.propertyIsEnumerable;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
        1: 2
    }, 1);
    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor(this, V);
        return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;
    return objectPropertyIsEnumerable;
}

var createPropertyDescriptor;
var hasRequiredCreatePropertyDescriptor;
function requireCreatePropertyDescriptor() {
    if (hasRequiredCreatePropertyDescriptor) return createPropertyDescriptor;
    hasRequiredCreatePropertyDescriptor = 1;
    createPropertyDescriptor = function createPropertyDescriptor(bitmap, value) {
        return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value
        };
    };
    return createPropertyDescriptor;
}

var functionUncurryThis;
var hasRequiredFunctionUncurryThis;
function requireFunctionUncurryThis() {
    if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
    hasRequiredFunctionUncurryThis = 1;
    var NATIVE_BIND = requireFunctionBindNative();
    var FunctionPrototype = Function.prototype;
    var call = FunctionPrototype.call;
    var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
    functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function functionUncurryThis(fn) {
        return function() {
            return call.apply(fn, arguments);
        };
    };
    return functionUncurryThis;
}

var classofRaw;
var hasRequiredClassofRaw;
function requireClassofRaw() {
    if (hasRequiredClassofRaw) return classofRaw;
    hasRequiredClassofRaw = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var toString = uncurryThis({}.toString);
    var stringSlice = uncurryThis(''.slice);
    classofRaw = function classofRaw(it) {
        return stringSlice(toString(it), 8, -1);
    };
    return classofRaw;
}

var indexedObject;
var hasRequiredIndexedObject;
function requireIndexedObject() {
    if (hasRequiredIndexedObject) return indexedObject;
    hasRequiredIndexedObject = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var fails = requireFails();
    var classof = requireClassofRaw();
    var $Object = Object;
    var split = uncurryThis(''.split);
    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    indexedObject = fails(function() {
        // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
        // eslint-disable-next-line no-prototype-builtins -- safe
        return !$Object('z').propertyIsEnumerable(0);
    }) ? function indexedObject(it) {
        return classof(it) === 'String' ? split(it, '') : $Object(it);
    } : $Object;
    return indexedObject;
}

var isNullOrUndefined;
var hasRequiredIsNullOrUndefined;
function requireIsNullOrUndefined() {
    if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
    hasRequiredIsNullOrUndefined = 1;
    // we can't use just `it == null` since of `document.all` special case
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
    isNullOrUndefined = function isNullOrUndefined(it) {
        return it === null || it === undefined;
    };
    return isNullOrUndefined;
}

var requireObjectCoercible;
var hasRequiredRequireObjectCoercible;
function requireRequireObjectCoercible() {
    if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
    hasRequiredRequireObjectCoercible = 1;
    var isNullOrUndefined = requireIsNullOrUndefined();
    var $TypeError = TypeError;
    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    requireObjectCoercible = function requireObjectCoercible(it) {
        if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
        return it;
    };
    return requireObjectCoercible;
}

var toIndexedObject;
var hasRequiredToIndexedObject;
function requireToIndexedObject() {
    if (hasRequiredToIndexedObject) return toIndexedObject;
    hasRequiredToIndexedObject = 1;
    // toObject with fallback for non-array-like ES3 strings
    var IndexedObject = requireIndexedObject();
    var requireObjectCoercible = requireRequireObjectCoercible();
    toIndexedObject = function toIndexedObject(it) {
        return IndexedObject(requireObjectCoercible(it));
    };
    return toIndexedObject;
}

function _type_of$5(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var isCallable;
var hasRequiredIsCallable;
function requireIsCallable() {
    if (hasRequiredIsCallable) return isCallable;
    hasRequiredIsCallable = 1;
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
    var documentAll = (typeof document === "undefined" ? "undefined" : _type_of$5(document)) == 'object' && document.all;
    // `IsCallable` abstract operation
    // https://tc39.es/ecma262/#sec-iscallable
    // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
    isCallable = typeof documentAll == 'undefined' && documentAll !== undefined ? function isCallable(argument) {
        return typeof argument == 'function' || argument === documentAll;
    } : function(argument) {
        return typeof argument == 'function';
    };
    return isCallable;
}

function _type_of$4(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var isObject;
var hasRequiredIsObject;
function requireIsObject() {
    if (hasRequiredIsObject) return isObject;
    hasRequiredIsObject = 1;
    var isCallable = requireIsCallable();
    isObject = function isObject(it) {
        return (typeof it === "undefined" ? "undefined" : _type_of$4(it)) == 'object' ? it !== null : isCallable(it);
    };
    return isObject;
}

var getBuiltIn;
var hasRequiredGetBuiltIn;
function requireGetBuiltIn() {
    if (hasRequiredGetBuiltIn) return getBuiltIn;
    hasRequiredGetBuiltIn = 1;
    var globalThis = requireGlobalThis();
    var isCallable = requireIsCallable();
    var aFunction = function aFunction(argument) {
        return isCallable(argument) ? argument : undefined;
    };
    getBuiltIn = function getBuiltIn(namespace, method) {
        return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
    };
    return getBuiltIn;
}

var objectIsPrototypeOf;
var hasRequiredObjectIsPrototypeOf;
function requireObjectIsPrototypeOf() {
    if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
    hasRequiredObjectIsPrototypeOf = 1;
    var uncurryThis = requireFunctionUncurryThis();
    objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
    return objectIsPrototypeOf;
}

var environmentUserAgent;
var hasRequiredEnvironmentUserAgent;
function requireEnvironmentUserAgent() {
    if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
    hasRequiredEnvironmentUserAgent = 1;
    var globalThis = requireGlobalThis();
    var navigator = globalThis.navigator;
    var userAgent = navigator && navigator.userAgent;
    environmentUserAgent = userAgent ? String(userAgent) : '';
    return environmentUserAgent;
}

var environmentV8Version;
var hasRequiredEnvironmentV8Version;
function requireEnvironmentV8Version() {
    if (hasRequiredEnvironmentV8Version) return environmentV8Version;
    hasRequiredEnvironmentV8Version = 1;
    var globalThis = requireGlobalThis();
    var userAgent = requireEnvironmentUserAgent();
    var process = globalThis.process;
    var Deno = globalThis.Deno;
    var versions = process && process.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match, version;
    if (v8) {
        match = v8.split('.');
        // in old Chrome, versions of V8 isn't V8 = Chrome / 10
        // but their correct versions are not interesting for us
        version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
    }
    // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
    // so check `userAgent` even if `.v8` exists, but 0
    if (!version && userAgent) {
        match = userAgent.match(/Edge\/(\d+)/);
        if (!match || match[1] >= 74) {
            match = userAgent.match(/Chrome\/(\d+)/);
            if (match) version = +match[1];
        }
    }
    environmentV8Version = version;
    return environmentV8Version;
}

function _instanceof$1(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var symbolConstructorDetection;
var hasRequiredSymbolConstructorDetection;
function requireSymbolConstructorDetection() {
    if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
    hasRequiredSymbolConstructorDetection = 1;
    /* eslint-disable es/no-symbol -- required for testing */ var V8_VERSION = requireEnvironmentV8Version();
    var fails = requireFails();
    var globalThis = requireGlobalThis();
    var $String = globalThis.String;
    // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function() {
        var symbol = Symbol('symbol detection');
        // Chrome 38 Symbol has incorrect toString conversion
        // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
        // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
        // of course, fail.
        return !$String(symbol) || !_instanceof$1(Object(symbol), Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });
    return symbolConstructorDetection;
}

function _type_of$3(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var useSymbolAsUid;
var hasRequiredUseSymbolAsUid;
function requireUseSymbolAsUid() {
    if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
    hasRequiredUseSymbolAsUid = 1;
    /* eslint-disable es/no-symbol -- required for testing */ var NATIVE_SYMBOL = requireSymbolConstructorDetection();
    useSymbolAsUid = NATIVE_SYMBOL && !Symbol.sham && _type_of$3(Symbol.iterator) == 'symbol';
    return useSymbolAsUid;
}

function _type_of$2(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var isSymbol;
var hasRequiredIsSymbol;
function requireIsSymbol() {
    if (hasRequiredIsSymbol) return isSymbol;
    hasRequiredIsSymbol = 1;
    var getBuiltIn = requireGetBuiltIn();
    var isCallable = requireIsCallable();
    var isPrototypeOf = requireObjectIsPrototypeOf();
    var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();
    var $Object = Object;
    isSymbol = USE_SYMBOL_AS_UID ? function isSymbol(it) {
        return (typeof it === "undefined" ? "undefined" : _type_of$2(it)) == 'symbol';
    } : function(it) {
        var $Symbol = getBuiltIn('Symbol');
        return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
    };
    return isSymbol;
}

var tryToString;
var hasRequiredTryToString;
function requireTryToString() {
    if (hasRequiredTryToString) return tryToString;
    hasRequiredTryToString = 1;
    var $String = String;
    tryToString = function tryToString(argument) {
        try {
            return $String(argument);
        } catch (error) {
            return 'Object';
        }
    };
    return tryToString;
}

var aCallable;
var hasRequiredACallable;
function requireACallable() {
    if (hasRequiredACallable) return aCallable;
    hasRequiredACallable = 1;
    var isCallable = requireIsCallable();
    var tryToString = requireTryToString();
    var $TypeError = TypeError;
    // `Assert: IsCallable(argument) is true`
    aCallable = function aCallable(argument) {
        if (isCallable(argument)) return argument;
        throw new $TypeError(tryToString(argument) + ' is not a function');
    };
    return aCallable;
}

var getMethod;
var hasRequiredGetMethod;
function requireGetMethod() {
    if (hasRequiredGetMethod) return getMethod;
    hasRequiredGetMethod = 1;
    var aCallable = requireACallable();
    var isNullOrUndefined = requireIsNullOrUndefined();
    // `GetMethod` abstract operation
    // https://tc39.es/ecma262/#sec-getmethod
    getMethod = function getMethod(V, P) {
        var func = V[P];
        return isNullOrUndefined(func) ? undefined : aCallable(func);
    };
    return getMethod;
}

var ordinaryToPrimitive;
var hasRequiredOrdinaryToPrimitive;
function requireOrdinaryToPrimitive() {
    if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
    hasRequiredOrdinaryToPrimitive = 1;
    var call = requireFunctionCall();
    var isCallable = requireIsCallable();
    var isObject = requireIsObject();
    var $TypeError = TypeError;
    // `OrdinaryToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-ordinarytoprimitive
    ordinaryToPrimitive = function ordinaryToPrimitive(input, pref) {
        var fn, val;
        if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
        if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
        if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
        throw new $TypeError("Can't convert object to primitive value");
    };
    return ordinaryToPrimitive;
}

var sharedStore = {
    exports: {}
};

var isPure;
var hasRequiredIsPure;
function requireIsPure() {
    if (hasRequiredIsPure) return isPure;
    hasRequiredIsPure = 1;
    isPure = false;
    return isPure;
}

var defineGlobalProperty;
var hasRequiredDefineGlobalProperty;
function requireDefineGlobalProperty() {
    if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
    hasRequiredDefineGlobalProperty = 1;
    var globalThis = requireGlobalThis();
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty = Object.defineProperty;
    defineGlobalProperty = function defineGlobalProperty(key, value) {
        try {
            defineProperty(globalThis, key, {
                value: value,
                configurable: true,
                writable: true
            });
        } catch (error) {
            globalThis[key] = value;
        }
        return value;
    };
    return defineGlobalProperty;
}

var hasRequiredSharedStore;
function requireSharedStore() {
    if (hasRequiredSharedStore) return sharedStore.exports;
    hasRequiredSharedStore = 1;
    var IS_PURE = requireIsPure();
    var globalThis = requireGlobalThis();
    var defineGlobalProperty = requireDefineGlobalProperty();
    var SHARED = '__core-js_shared__';
    var store = sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});
    (store.versions || (store.versions = [])).push({
        version: '3.39.0',
        mode: IS_PURE ? 'pure' : 'global',
        copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
        license: 'https://github.com/zloirock/core-js/blob/v3.39.0/LICENSE',
        source: 'https://github.com/zloirock/core-js'
    });
    return sharedStore.exports;
}

var shared;
var hasRequiredShared;
function requireShared() {
    if (hasRequiredShared) return shared;
    hasRequiredShared = 1;
    var store = requireSharedStore();
    shared = function shared(key, value) {
        return store[key] || (store[key] = value || {});
    };
    return shared;
}

var toObject;
var hasRequiredToObject;
function requireToObject() {
    if (hasRequiredToObject) return toObject;
    hasRequiredToObject = 1;
    var requireObjectCoercible = requireRequireObjectCoercible();
    var $Object = Object;
    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    toObject = function toObject(argument) {
        return $Object(requireObjectCoercible(argument));
    };
    return toObject;
}

var hasOwnProperty_1;
var hasRequiredHasOwnProperty;
function requireHasOwnProperty() {
    if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
    hasRequiredHasOwnProperty = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var toObject = requireToObject();
    var hasOwnProperty = uncurryThis({}.hasOwnProperty);
    // `HasOwnProperty` abstract operation
    // https://tc39.es/ecma262/#sec-hasownproperty
    // eslint-disable-next-line es/no-object-hasown -- safe
    hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
        return hasOwnProperty(toObject(it), key);
    };
    return hasOwnProperty_1;
}

var uid;
var hasRequiredUid;
function requireUid() {
    if (hasRequiredUid) return uid;
    hasRequiredUid = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var id = 0;
    var postfix = Math.random();
    var toString = uncurryThis(1.0.toString);
    uid = function uid(key) {
        return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
    };
    return uid;
}

var wellKnownSymbol;
var hasRequiredWellKnownSymbol;
function requireWellKnownSymbol() {
    if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
    hasRequiredWellKnownSymbol = 1;
    var globalThis = requireGlobalThis();
    var shared = requireShared();
    var hasOwn = requireHasOwnProperty();
    var uid = requireUid();
    var NATIVE_SYMBOL = requireSymbolConstructorDetection();
    var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();
    var Symbol = globalThis.Symbol;
    var WellKnownSymbolsStore = shared('wks');
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;
    wellKnownSymbol = function wellKnownSymbol(name) {
        if (!hasOwn(WellKnownSymbolsStore, name)) {
            WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol('Symbol.' + name);
        }
        return WellKnownSymbolsStore[name];
    };
    return wellKnownSymbol;
}

var toPrimitive;
var hasRequiredToPrimitive;
function requireToPrimitive() {
    if (hasRequiredToPrimitive) return toPrimitive;
    hasRequiredToPrimitive = 1;
    var call = requireFunctionCall();
    var isObject = requireIsObject();
    var isSymbol = requireIsSymbol();
    var getMethod = requireGetMethod();
    var ordinaryToPrimitive = requireOrdinaryToPrimitive();
    var wellKnownSymbol = requireWellKnownSymbol();
    var $TypeError = TypeError;
    var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    toPrimitive = function toPrimitive(input, pref) {
        if (!isObject(input) || isSymbol(input)) return input;
        var exoticToPrim = getMethod(input, TO_PRIMITIVE);
        var result;
        if (exoticToPrim) {
            if (pref === undefined) pref = 'default';
            result = call(exoticToPrim, input, pref);
            if (!isObject(result) || isSymbol(result)) return result;
            throw new $TypeError("Can't convert object to primitive value");
        }
        if (pref === undefined) pref = 'number';
        return ordinaryToPrimitive(input, pref);
    };
    return toPrimitive;
}

var toPropertyKey;
var hasRequiredToPropertyKey;
function requireToPropertyKey() {
    if (hasRequiredToPropertyKey) return toPropertyKey;
    hasRequiredToPropertyKey = 1;
    var toPrimitive = requireToPrimitive();
    var isSymbol = requireIsSymbol();
    // `ToPropertyKey` abstract operation
    // https://tc39.es/ecma262/#sec-topropertykey
    toPropertyKey = function toPropertyKey(argument) {
        var key = toPrimitive(argument, 'string');
        return isSymbol(key) ? key : key + '';
    };
    return toPropertyKey;
}

var documentCreateElement;
var hasRequiredDocumentCreateElement;
function requireDocumentCreateElement() {
    if (hasRequiredDocumentCreateElement) return documentCreateElement;
    hasRequiredDocumentCreateElement = 1;
    var globalThis = requireGlobalThis();
    var isObject = requireIsObject();
    var document = globalThis.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS = isObject(document) && isObject(document.createElement);
    documentCreateElement = function documentCreateElement(it) {
        return EXISTS ? document.createElement(it) : {};
    };
    return documentCreateElement;
}

var ie8DomDefine;
var hasRequiredIe8DomDefine;
function requireIe8DomDefine() {
    if (hasRequiredIe8DomDefine) return ie8DomDefine;
    hasRequiredIe8DomDefine = 1;
    var DESCRIPTORS = requireDescriptors();
    var fails = requireFails();
    var createElement = requireDocumentCreateElement();
    // Thanks to IE8 for its funny defineProperty
    ie8DomDefine = !DESCRIPTORS && !fails(function() {
        // eslint-disable-next-line es/no-object-defineproperty -- required for testing
        return Object.defineProperty(createElement('div'), 'a', {
            get: function get() {
                return 7;
            }
        }).a !== 7;
    });
    return ie8DomDefine;
}

var hasRequiredObjectGetOwnPropertyDescriptor;
function requireObjectGetOwnPropertyDescriptor() {
    if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
    hasRequiredObjectGetOwnPropertyDescriptor = 1;
    var DESCRIPTORS = requireDescriptors();
    var call = requireFunctionCall();
    var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
    var createPropertyDescriptor = requireCreatePropertyDescriptor();
    var toIndexedObject = requireToIndexedObject();
    var toPropertyKey = requireToPropertyKey();
    var hasOwn = requireHasOwnProperty();
    var IE8_DOM_DEFINE = requireIe8DomDefine();
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O);
        P = toPropertyKey(P);
        if (IE8_DOM_DEFINE) try {
            return $getOwnPropertyDescriptor(O, P);
        } catch (error) {}
        if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
    };
    return objectGetOwnPropertyDescriptor;
}

var objectDefineProperty = {};

var v8PrototypeDefineBug;
var hasRequiredV8PrototypeDefineBug;
function requireV8PrototypeDefineBug() {
    if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
    hasRequiredV8PrototypeDefineBug = 1;
    var DESCRIPTORS = requireDescriptors();
    var fails = requireFails();
    // V8 ~ Chrome 36-
    // https://bugs.chromium.org/p/v8/issues/detail?id=3334
    v8PrototypeDefineBug = DESCRIPTORS && fails(function() {
        // eslint-disable-next-line es/no-object-defineproperty -- required for testing
        return Object.defineProperty(function() {}, 'prototype', {
            value: 42,
            writable: false
        }).prototype !== 42;
    });
    return v8PrototypeDefineBug;
}

var anObject;
var hasRequiredAnObject;
function requireAnObject() {
    if (hasRequiredAnObject) return anObject;
    hasRequiredAnObject = 1;
    var isObject = requireIsObject();
    var $String = String;
    var $TypeError = TypeError;
    // `Assert: Type(argument) is Object`
    anObject = function anObject(argument) {
        if (isObject(argument)) return argument;
        throw new $TypeError($String(argument) + ' is not an object');
    };
    return anObject;
}

var hasRequiredObjectDefineProperty;
function requireObjectDefineProperty() {
    if (hasRequiredObjectDefineProperty) return objectDefineProperty;
    hasRequiredObjectDefineProperty = 1;
    var DESCRIPTORS = requireDescriptors();
    var IE8_DOM_DEFINE = requireIe8DomDefine();
    var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
    var anObject = requireAnObject();
    var toPropertyKey = requireToPropertyKey();
    var $TypeError = TypeError;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var $defineProperty = Object.defineProperty;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ENUMERABLE = 'enumerable';
    var CONFIGURABLE = 'configurable';
    var WRITABLE = 'writable';
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    objectDefineProperty.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPropertyKey(P);
        anObject(Attributes);
        if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
            var current = $getOwnPropertyDescriptor(O, P);
            if (current && current[WRITABLE]) {
                O[P] = Attributes.value;
                Attributes = {
                    configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
                    enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                    writable: false
                };
            }
        }
        return $defineProperty(O, P, Attributes);
    } : $defineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPropertyKey(P);
        anObject(Attributes);
        if (IE8_DOM_DEFINE) try {
            return $defineProperty(O, P, Attributes);
        } catch (error) {}
        if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
        if ('value' in Attributes) O[P] = Attributes.value;
        return O;
    };
    return objectDefineProperty;
}

var createNonEnumerableProperty;
var hasRequiredCreateNonEnumerableProperty;
function requireCreateNonEnumerableProperty() {
    if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
    hasRequiredCreateNonEnumerableProperty = 1;
    var DESCRIPTORS = requireDescriptors();
    var definePropertyModule = requireObjectDefineProperty();
    var createPropertyDescriptor = requireCreatePropertyDescriptor();
    createNonEnumerableProperty = DESCRIPTORS ? function createNonEnumerableProperty(object, key, value) {
        return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
    return createNonEnumerableProperty;
}

var makeBuiltIn = {
    exports: {}
};

var functionName;
var hasRequiredFunctionName;
function requireFunctionName() {
    if (hasRequiredFunctionName) return functionName;
    hasRequiredFunctionName = 1;
    var DESCRIPTORS = requireDescriptors();
    var hasOwn = requireHasOwnProperty();
    var FunctionPrototype = Function.prototype;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
    var EXISTS = hasOwn(FunctionPrototype, 'name');
    // additional protection from minified / mangled / dropped function names
    var PROPER = EXISTS && (function something() {}).name === 'something';
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
    functionName = {
        EXISTS: EXISTS,
        PROPER: PROPER,
        CONFIGURABLE: CONFIGURABLE
    };
    return functionName;
}

var inspectSource;
var hasRequiredInspectSource;
function requireInspectSource() {
    if (hasRequiredInspectSource) return inspectSource;
    hasRequiredInspectSource = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var isCallable = requireIsCallable();
    var store = requireSharedStore();
    var functionToString = uncurryThis(Function.toString);
    // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    if (!isCallable(store.inspectSource)) {
        store.inspectSource = function(it) {
            return functionToString(it);
        };
    }
    inspectSource = store.inspectSource;
    return inspectSource;
}

var weakMapBasicDetection;
var hasRequiredWeakMapBasicDetection;
function requireWeakMapBasicDetection() {
    if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
    hasRequiredWeakMapBasicDetection = 1;
    var globalThis = requireGlobalThis();
    var isCallable = requireIsCallable();
    var WeakMap = globalThis.WeakMap;
    weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
    return weakMapBasicDetection;
}

var sharedKey;
var hasRequiredSharedKey;
function requireSharedKey() {
    if (hasRequiredSharedKey) return sharedKey;
    hasRequiredSharedKey = 1;
    var shared = requireShared();
    var uid = requireUid();
    var keys = shared('keys');
    sharedKey = function sharedKey(key) {
        return keys[key] || (keys[key] = uid(key));
    };
    return sharedKey;
}

var hiddenKeys;
var hasRequiredHiddenKeys;
function requireHiddenKeys() {
    if (hasRequiredHiddenKeys) return hiddenKeys;
    hasRequiredHiddenKeys = 1;
    hiddenKeys = {};
    return hiddenKeys;
}

var internalState;
var hasRequiredInternalState;
function requireInternalState() {
    if (hasRequiredInternalState) return internalState;
    hasRequiredInternalState = 1;
    var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
    var globalThis = requireGlobalThis();
    var isObject = requireIsObject();
    var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
    var hasOwn = requireHasOwnProperty();
    var shared = requireSharedStore();
    var sharedKey = requireSharedKey();
    var hiddenKeys = requireHiddenKeys();
    var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
    var TypeError = globalThis.TypeError;
    var WeakMap = globalThis.WeakMap;
    var set, get, has;
    var enforce = function enforce(it) {
        return has(it) ? get(it) : set(it, {});
    };
    var getterFor = function getterFor(TYPE) {
        return function(it) {
            var state;
            if (!isObject(it) || (state = get(it)).type !== TYPE) {
                throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
            }
            return state;
        };
    };
    if (NATIVE_WEAK_MAP || shared.state) {
        var store = shared.state || (shared.state = new WeakMap());
        /* eslint-disable no-self-assign -- prototype methods protection */ store.get = store.get;
        store.has = store.has;
        store.set = store.set;
        /* eslint-enable no-self-assign -- prototype methods protection */ set = function set(it, metadata) {
            if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
            metadata.facade = it;
            store.set(it, metadata);
            return metadata;
        };
        get = function get(it) {
            return store.get(it) || {};
        };
        has = function has(it) {
            return store.has(it);
        };
    } else {
        var STATE = sharedKey('state');
        hiddenKeys[STATE] = true;
        set = function set(it, metadata) {
            if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
            metadata.facade = it;
            createNonEnumerableProperty(it, STATE, metadata);
            return metadata;
        };
        get = function get(it) {
            return hasOwn(it, STATE) ? it[STATE] : {};
        };
        has = function has(it) {
            return hasOwn(it, STATE);
        };
    }
    internalState = {
        set: set,
        get: get,
        has: has,
        enforce: enforce,
        getterFor: getterFor
    };
    return internalState;
}

var hasRequiredMakeBuiltIn;
function requireMakeBuiltIn() {
    if (hasRequiredMakeBuiltIn) return makeBuiltIn.exports;
    hasRequiredMakeBuiltIn = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var fails = requireFails();
    var isCallable = requireIsCallable();
    var hasOwn = requireHasOwnProperty();
    var DESCRIPTORS = requireDescriptors();
    var CONFIGURABLE_FUNCTION_NAME = requireFunctionName().CONFIGURABLE;
    var inspectSource = requireInspectSource();
    var InternalStateModule = requireInternalState();
    var enforceInternalState = InternalStateModule.enforce;
    var getInternalState = InternalStateModule.get;
    var $String = String;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty = Object.defineProperty;
    var stringSlice = uncurryThis(''.slice);
    var replace = uncurryThis(''.replace);
    var join = uncurryThis([].join);
    var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
        return defineProperty(function() {}, 'length', {
            value: 8
        }).length !== 8;
    });
    var TEMPLATE = String(String).split('String');
    var makeBuiltIn$1 = makeBuiltIn.exports = function makeBuiltIn(value, name, options) {
        if (stringSlice($String(name), 0, 7) === 'Symbol(') {
            name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
        }
        if (options && options.getter) name = 'get ' + name;
        if (options && options.setter) name = 'set ' + name;
        if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
            if (DESCRIPTORS) defineProperty(value, 'name', {
                value: name,
                configurable: true
            });
            else value.name = name;
        }
        if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
            defineProperty(value, 'length', {
                value: options.arity
            });
        }
        try {
            if (options && hasOwn(options, 'constructor') && options.constructor) {
                if (DESCRIPTORS) defineProperty(value, 'prototype', {
                    writable: false
                });
            // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
            } else if (value.prototype) value.prototype = undefined;
        } catch (error) {}
        var state = enforceInternalState(value);
        if (!hasOwn(state, 'source')) {
            state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
        }
        return value;
    };
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    // eslint-disable-next-line no-extend-native -- required
    Function.prototype.toString = makeBuiltIn$1(function toString() {
        return isCallable(this) && getInternalState(this).source || inspectSource(this);
    }, 'toString');
    return makeBuiltIn.exports;
}

var defineBuiltIn;
var hasRequiredDefineBuiltIn;
function requireDefineBuiltIn() {
    if (hasRequiredDefineBuiltIn) return defineBuiltIn;
    hasRequiredDefineBuiltIn = 1;
    var isCallable = requireIsCallable();
    var definePropertyModule = requireObjectDefineProperty();
    var makeBuiltIn = requireMakeBuiltIn();
    var defineGlobalProperty = requireDefineGlobalProperty();
    defineBuiltIn = function defineBuiltIn(O, key, value, options) {
        if (!options) options = {};
        var simple = options.enumerable;
        var name = options.name !== undefined ? options.name : key;
        if (isCallable(value)) makeBuiltIn(value, name, options);
        if (options.global) {
            if (simple) O[key] = value;
            else defineGlobalProperty(key, value);
        } else {
            try {
                if (!options.unsafe) delete O[key];
                else if (O[key]) simple = true;
            } catch (error) {}
            if (simple) O[key] = value;
            else definePropertyModule.f(O, key, {
                value: value,
                enumerable: false,
                configurable: !options.nonConfigurable,
                writable: !options.nonWritable
            });
        }
        return O;
    };
    return defineBuiltIn;
}

var objectGetOwnPropertyNames = {};

var mathTrunc;
var hasRequiredMathTrunc;
function requireMathTrunc() {
    if (hasRequiredMathTrunc) return mathTrunc;
    hasRequiredMathTrunc = 1;
    var ceil = Math.ceil;
    var floor = Math.floor;
    // `Math.trunc` method
    // https://tc39.es/ecma262/#sec-math.trunc
    // eslint-disable-next-line es/no-math-trunc -- safe
    mathTrunc = Math.trunc || function trunc(x) {
        var n = +x;
        return (n > 0 ? floor : ceil)(n);
    };
    return mathTrunc;
}

var toIntegerOrInfinity;
var hasRequiredToIntegerOrInfinity;
function requireToIntegerOrInfinity() {
    if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
    hasRequiredToIntegerOrInfinity = 1;
    var trunc = requireMathTrunc();
    // `ToIntegerOrInfinity` abstract operation
    // https://tc39.es/ecma262/#sec-tointegerorinfinity
    toIntegerOrInfinity = function toIntegerOrInfinity(argument) {
        var number = +argument;
        // eslint-disable-next-line no-self-compare -- NaN check
        return number !== number || number === 0 ? 0 : trunc(number);
    };
    return toIntegerOrInfinity;
}

var toAbsoluteIndex;
var hasRequiredToAbsoluteIndex;
function requireToAbsoluteIndex() {
    if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
    hasRequiredToAbsoluteIndex = 1;
    var toIntegerOrInfinity = requireToIntegerOrInfinity();
    var max = Math.max;
    var min = Math.min;
    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    toAbsoluteIndex = function toAbsoluteIndex(index, length) {
        var integer = toIntegerOrInfinity(index);
        return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };
    return toAbsoluteIndex;
}

var toLength;
var hasRequiredToLength;
function requireToLength() {
    if (hasRequiredToLength) return toLength;
    hasRequiredToLength = 1;
    var toIntegerOrInfinity = requireToIntegerOrInfinity();
    var min = Math.min;
    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    toLength = function toLength(argument) {
        var len = toIntegerOrInfinity(argument);
        return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };
    return toLength;
}

var lengthOfArrayLike;
var hasRequiredLengthOfArrayLike;
function requireLengthOfArrayLike() {
    if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
    hasRequiredLengthOfArrayLike = 1;
    var toLength = requireToLength();
    // `LengthOfArrayLike` abstract operation
    // https://tc39.es/ecma262/#sec-lengthofarraylike
    lengthOfArrayLike = function lengthOfArrayLike(obj) {
        return toLength(obj.length);
    };
    return lengthOfArrayLike;
}

var arrayIncludes;
var hasRequiredArrayIncludes;
function requireArrayIncludes() {
    if (hasRequiredArrayIncludes) return arrayIncludes;
    hasRequiredArrayIncludes = 1;
    var toIndexedObject = requireToIndexedObject();
    var toAbsoluteIndex = requireToAbsoluteIndex();
    var lengthOfArrayLike = requireLengthOfArrayLike();
    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod = function createMethod(IS_INCLUDES) {
        return function($this, el, fromIndex) {
            var O = toIndexedObject($this);
            var length = lengthOfArrayLike(O);
            if (length === 0) return !IS_INCLUDES && -1;
            var index = toAbsoluteIndex(fromIndex, length);
            var value;
            // Array#includes uses SameValueZero equality algorithm
            // eslint-disable-next-line no-self-compare -- NaN check
            if (IS_INCLUDES && el !== el) while(length > index){
                value = O[index++];
                // eslint-disable-next-line no-self-compare -- NaN check
                if (value !== value) return true;
            // Array#indexOf ignores holes, Array#includes - not
            }
            else for(; length > index; index++){
                if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
            }
            return !IS_INCLUDES && -1;
        };
    };
    arrayIncludes = {
        // `Array.prototype.includes` method
        // https://tc39.es/ecma262/#sec-array.prototype.includes
        includes: createMethod(true),
        // `Array.prototype.indexOf` method
        // https://tc39.es/ecma262/#sec-array.prototype.indexof
        indexOf: createMethod(false)
    };
    return arrayIncludes;
}

var objectKeysInternal;
var hasRequiredObjectKeysInternal;
function requireObjectKeysInternal() {
    if (hasRequiredObjectKeysInternal) return objectKeysInternal;
    hasRequiredObjectKeysInternal = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var hasOwn = requireHasOwnProperty();
    var toIndexedObject = requireToIndexedObject();
    var indexOf = requireArrayIncludes().indexOf;
    var hiddenKeys = requireHiddenKeys();
    var push = uncurryThis([].push);
    objectKeysInternal = function objectKeysInternal(object, names) {
        var O = toIndexedObject(object);
        var i = 0;
        var result = [];
        var key;
        for(key in O)!hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
        // Don't enum bug & hidden keys
        while(names.length > i)if (hasOwn(O, key = names[i++])) {
            ~indexOf(result, key) || push(result, key);
        }
        return result;
    };
    return objectKeysInternal;
}

var enumBugKeys;
var hasRequiredEnumBugKeys;
function requireEnumBugKeys() {
    if (hasRequiredEnumBugKeys) return enumBugKeys;
    hasRequiredEnumBugKeys = 1;
    // IE8- don't enum bug keys
    enumBugKeys = [
        'constructor',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'toLocaleString',
        'toString',
        'valueOf'
    ];
    return enumBugKeys;
}

var hasRequiredObjectGetOwnPropertyNames;
function requireObjectGetOwnPropertyNames() {
    if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
    hasRequiredObjectGetOwnPropertyNames = 1;
    var internalObjectKeys = requireObjectKeysInternal();
    var enumBugKeys = requireEnumBugKeys();
    var hiddenKeys = enumBugKeys.concat('length', 'prototype');
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    // eslint-disable-next-line es/no-object-getownpropertynames -- safe
    objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return internalObjectKeys(O, hiddenKeys);
    };
    return objectGetOwnPropertyNames;
}

var objectGetOwnPropertySymbols = {};

var hasRequiredObjectGetOwnPropertySymbols;
function requireObjectGetOwnPropertySymbols() {
    if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
    hasRequiredObjectGetOwnPropertySymbols = 1;
    // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
    objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
    return objectGetOwnPropertySymbols;
}

var ownKeys;
var hasRequiredOwnKeys;
function requireOwnKeys() {
    if (hasRequiredOwnKeys) return ownKeys;
    hasRequiredOwnKeys = 1;
    var getBuiltIn = requireGetBuiltIn();
    var uncurryThis = requireFunctionUncurryThis();
    var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
    var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
    var anObject = requireAnObject();
    var concat = uncurryThis([].concat);
    // all object keys, includes non-enumerable and symbols
    ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
        var keys = getOwnPropertyNamesModule.f(anObject(it));
        var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
        return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
    };
    return ownKeys;
}

var copyConstructorProperties;
var hasRequiredCopyConstructorProperties;
function requireCopyConstructorProperties() {
    if (hasRequiredCopyConstructorProperties) return copyConstructorProperties;
    hasRequiredCopyConstructorProperties = 1;
    var hasOwn = requireHasOwnProperty();
    var ownKeys = requireOwnKeys();
    var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
    var definePropertyModule = requireObjectDefineProperty();
    copyConstructorProperties = function copyConstructorProperties(target, source, exceptions) {
        var keys = ownKeys(source);
        var defineProperty = definePropertyModule.f;
        var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
                defineProperty(target, key, getOwnPropertyDescriptor(source, key));
            }
        }
    };
    return copyConstructorProperties;
}

var isForced_1;
var hasRequiredIsForced;
function requireIsForced() {
    if (hasRequiredIsForced) return isForced_1;
    hasRequiredIsForced = 1;
    var fails = requireFails();
    var isCallable = requireIsCallable();
    var replacement = /#|\.prototype\./;
    var isForced = function isForced(feature, detection) {
        var value = data[normalize(feature)];
        return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
    };
    var normalize = isForced.normalize = function normalize(string) {
        return String(string).replace(replacement, '.').toLowerCase();
    };
    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = 'N';
    var POLYFILL = isForced.POLYFILL = 'P';
    isForced_1 = isForced;
    return isForced_1;
}

function _type_of$1(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var _export;
var hasRequired_export;
function require_export() {
    if (hasRequired_export) return _export;
    hasRequired_export = 1;
    var globalThis = requireGlobalThis();
    var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
    var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
    var defineBuiltIn = requireDefineBuiltIn();
    var defineGlobalProperty = requireDefineGlobalProperty();
    var copyConstructorProperties = requireCopyConstructorProperties();
    var isForced = requireIsForced();
    /*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/ _export = function _export(options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED, target, key, targetProperty, sourceProperty, descriptor;
        if (GLOBAL) {
            target = globalThis;
        } else if (STATIC) {
            target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
        } else {
            target = globalThis[TARGET] && globalThis[TARGET].prototype;
        }
        if (target) for(key in source){
            sourceProperty = source[key];
            if (options.dontCallGetSet) {
                descriptor = getOwnPropertyDescriptor(target, key);
                targetProperty = descriptor && descriptor.value;
            } else targetProperty = target[key];
            FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
            // contained in target
            if (!FORCED && targetProperty !== undefined) {
                if ((typeof sourceProperty === "undefined" ? "undefined" : _type_of$1(sourceProperty)) == (typeof targetProperty === "undefined" ? "undefined" : _type_of$1(targetProperty))) continue;
                copyConstructorProperties(sourceProperty, targetProperty);
            }
            // add a flag to not completely full polyfills
            if (options.sham || targetProperty && targetProperty.sham) {
                createNonEnumerableProperty(sourceProperty, 'sham', true);
            }
            defineBuiltIn(target, key, sourceProperty, options);
        }
    };
    return _export;
}

var objectKeys;
var hasRequiredObjectKeys;
function requireObjectKeys() {
    if (hasRequiredObjectKeys) return objectKeys;
    hasRequiredObjectKeys = 1;
    var internalObjectKeys = requireObjectKeysInternal();
    var enumBugKeys = requireEnumBugKeys();
    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    // eslint-disable-next-line es/no-object-keys -- safe
    objectKeys = Object.keys || function keys(O) {
        return internalObjectKeys(O, enumBugKeys);
    };
    return objectKeys;
}

var objectAssign;
var hasRequiredObjectAssign;
function requireObjectAssign() {
    if (hasRequiredObjectAssign) return objectAssign;
    hasRequiredObjectAssign = 1;
    var DESCRIPTORS = requireDescriptors();
    var uncurryThis = requireFunctionUncurryThis();
    var call = requireFunctionCall();
    var fails = requireFails();
    var objectKeys = requireObjectKeys();
    var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
    var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
    var toObject = requireToObject();
    var IndexedObject = requireIndexedObject();
    // eslint-disable-next-line es/no-object-assign -- safe
    var $assign = Object.assign;
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    var defineProperty = Object.defineProperty;
    var concat = uncurryThis([].concat);
    // `Object.assign` method
    // https://tc39.es/ecma262/#sec-object.assign
    objectAssign = !$assign || fails(function() {
        // should have correct order of operations (Edge bug)
        if (DESCRIPTORS && $assign({
            b: 1
        }, $assign(defineProperty({}, 'a', {
            enumerable: true,
            get: function get() {
                defineProperty(this, 'b', {
                    value: 3,
                    enumerable: false
                });
            }
        }), {
            b: 2
        })).b !== 1) return true;
        // should work with symbols and should have deterministic property order (V8 bug)
        var A = {};
        var B = {};
        // eslint-disable-next-line es/no-symbol -- safe
        var symbol = Symbol('assign detection');
        var alphabet = 'abcdefghijklmnopqrst';
        A[symbol] = 7;
        alphabet.split('').forEach(function(chr) {
            B[chr] = chr;
        });
        return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
    }) ? function assign(target, source) {
        var T = toObject(target);
        var argumentsLength = arguments.length;
        var index = 1;
        var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
        var propertyIsEnumerable = propertyIsEnumerableModule.f;
        while(argumentsLength > index){
            var S = IndexedObject(arguments[index++]);
            var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
            var length = keys.length;
            var j = 0;
            var key;
            while(length > j){
                key = keys[j++];
                if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
            }
        }
        return T;
    } : $assign;
    return objectAssign;
}

var hasRequiredEs_object_assign;
function requireEs_object_assign() {
    if (hasRequiredEs_object_assign) return es_object_assign;
    hasRequiredEs_object_assign = 1;
    var $ = require_export();
    var assign = requireObjectAssign();
    // `Object.assign` method
    // https://tc39.es/ecma262/#sec-object.assign
    // eslint-disable-next-line es/no-object-assign -- required for testing
    $({
        target: 'Object',
        stat: true,
        arity: 2,
        forced: Object.assign !== assign
    }, {
        assign: assign
    });
    return es_object_assign;
}

var path;
var hasRequiredPath;
function requirePath() {
    if (hasRequiredPath) return path;
    hasRequiredPath = 1;
    var globalThis = requireGlobalThis();
    path = globalThis;
    return path;
}

var assign$2;
var hasRequiredAssign$2;
function requireAssign$2() {
    if (hasRequiredAssign$2) return assign$2;
    hasRequiredAssign$2 = 1;
    requireEs_object_assign();
    var path = requirePath();
    assign$2 = path.Object.assign;
    return assign$2;
}

var assign$1;
var hasRequiredAssign$1;
function requireAssign$1() {
    if (hasRequiredAssign$1) return assign$1;
    hasRequiredAssign$1 = 1;
    var parent = requireAssign$2();
    assign$1 = parent;
    return assign$1;
}

var assign;
var hasRequiredAssign;
function requireAssign() {
    if (hasRequiredAssign) return assign;
    hasRequiredAssign = 1;
    var parent = requireAssign$1();
    assign = parent;
    return assign;
}

var es_object_keys = {};

var hasRequiredEs_object_keys;
function requireEs_object_keys() {
    if (hasRequiredEs_object_keys) return es_object_keys;
    hasRequiredEs_object_keys = 1;
    var $ = require_export();
    var toObject = requireToObject();
    var nativeKeys = requireObjectKeys();
    var fails = requireFails();
    var FAILS_ON_PRIMITIVES = fails(function() {
        nativeKeys(1);
    });
    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    $({
        target: 'Object',
        stat: true,
        forced: FAILS_ON_PRIMITIVES
    }, {
        keys: function keys(it) {
            return nativeKeys(toObject(it));
        }
    });
    return es_object_keys;
}

var keys$2;
var hasRequiredKeys$2;
function requireKeys$2() {
    if (hasRequiredKeys$2) return keys$2;
    hasRequiredKeys$2 = 1;
    requireEs_object_keys();
    var path = requirePath();
    keys$2 = path.Object.keys;
    return keys$2;
}

var keys$1;
var hasRequiredKeys$1;
function requireKeys$1() {
    if (hasRequiredKeys$1) return keys$1;
    hasRequiredKeys$1 = 1;
    var parent = requireKeys$2();
    keys$1 = parent;
    return keys$1;
}

var keys;
var hasRequiredKeys;
function requireKeys() {
    if (hasRequiredKeys) return keys;
    hasRequiredKeys = 1;
    var parent = requireKeys$1();
    keys = parent;
    return keys;
}

var es_array_find = {};

var functionUncurryThisClause;
var hasRequiredFunctionUncurryThisClause;
function requireFunctionUncurryThisClause() {
    if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
    hasRequiredFunctionUncurryThisClause = 1;
    var classofRaw = requireClassofRaw();
    var uncurryThis = requireFunctionUncurryThis();
    functionUncurryThisClause = function functionUncurryThisClause(fn) {
        // Nashorn bug:
        //   https://github.com/zloirock/core-js/issues/1128
        //   https://github.com/zloirock/core-js/issues/1130
        if (classofRaw(fn) === 'Function') return uncurryThis(fn);
    };
    return functionUncurryThisClause;
}

var functionBindContext;
var hasRequiredFunctionBindContext;
function requireFunctionBindContext() {
    if (hasRequiredFunctionBindContext) return functionBindContext;
    hasRequiredFunctionBindContext = 1;
    var uncurryThis = requireFunctionUncurryThisClause();
    var aCallable = requireACallable();
    var NATIVE_BIND = requireFunctionBindNative();
    var bind = uncurryThis(uncurryThis.bind);
    // optional / simple context binding
    functionBindContext = function functionBindContext(fn, that) {
        aCallable(fn);
        return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function() {
            return fn.apply(that, arguments);
        };
    };
    return functionBindContext;
}

var isArray;
var hasRequiredIsArray;
function requireIsArray() {
    if (hasRequiredIsArray) return isArray;
    hasRequiredIsArray = 1;
    var classof = requireClassofRaw();
    // `IsArray` abstract operation
    // https://tc39.es/ecma262/#sec-isarray
    // eslint-disable-next-line es/no-array-isarray -- safe
    isArray = Array.isArray || function isArray(argument) {
        return classof(argument) === 'Array';
    };
    return isArray;
}

var toStringTagSupport;
var hasRequiredToStringTagSupport;
function requireToStringTagSupport() {
    if (hasRequiredToStringTagSupport) return toStringTagSupport;
    hasRequiredToStringTagSupport = 1;
    var wellKnownSymbol = requireWellKnownSymbol();
    var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    var test = {};
    test[TO_STRING_TAG] = 'z';
    toStringTagSupport = String(test) === '[object z]';
    return toStringTagSupport;
}

var classof;
var hasRequiredClassof;
function requireClassof() {
    if (hasRequiredClassof) return classof;
    hasRequiredClassof = 1;
    var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
    var isCallable = requireIsCallable();
    var classofRaw = requireClassofRaw();
    var wellKnownSymbol = requireWellKnownSymbol();
    var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    var $Object = Object;
    // ES3 wrong here
    var CORRECT_ARGUMENTS = classofRaw(function() {
        return arguments;
    }()) === 'Arguments';
    // fallback for IE11 Script Access Denied error
    var tryGet = function tryGet(it, key) {
        try {
            return it[key];
        } catch (error) {}
    };
    // getting tag from ES6+ `Object.prototype.toString`
    classof = TO_STRING_TAG_SUPPORT ? classofRaw : function classof(it) {
        var O, tag, result;
        return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
    };
    return classof;
}

var isConstructor;
var hasRequiredIsConstructor;
function requireIsConstructor() {
    if (hasRequiredIsConstructor) return isConstructor;
    hasRequiredIsConstructor = 1;
    var uncurryThis = requireFunctionUncurryThis();
    var fails = requireFails();
    var isCallable = requireIsCallable();
    var classof = requireClassof();
    var getBuiltIn = requireGetBuiltIn();
    var inspectSource = requireInspectSource();
    var noop = function noop() {};
    var construct = getBuiltIn('Reflect', 'construct');
    var constructorRegExp = /^\s*(?:class|function)\b/;
    var exec = uncurryThis(constructorRegExp.exec);
    var INCORRECT_TO_STRING = !constructorRegExp.test(noop);
    var isConstructorModern = function isConstructor(argument) {
        if (!isCallable(argument)) return false;
        try {
            construct(noop, [], argument);
            return true;
        } catch (error) {
            return false;
        }
    };
    var isConstructorLegacy = function isConstructor(argument) {
        if (!isCallable(argument)) return false;
        switch(classof(argument)){
            case 'AsyncFunction':
            case 'GeneratorFunction':
            case 'AsyncGeneratorFunction':
                return false;
        }
        try {
            // we can't check .prototype since constructors produced by .bind haven't it
            // `Function#toString` throws on some built-it function in some legacy engines
            // (for example, `DOMQuad` and similar in FF41-)
            return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
        } catch (error) {
            return true;
        }
    };
    isConstructorLegacy.sham = true;
    // `IsConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-isconstructor
    isConstructor = !construct || fails(function() {
        var called;
        return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
            called = true;
        }) || called;
    }) ? isConstructorLegacy : isConstructorModern;
    return isConstructor;
}

var arraySpeciesConstructor;
var hasRequiredArraySpeciesConstructor;
function requireArraySpeciesConstructor() {
    if (hasRequiredArraySpeciesConstructor) return arraySpeciesConstructor;
    hasRequiredArraySpeciesConstructor = 1;
    var isArray = requireIsArray();
    var isConstructor = requireIsConstructor();
    var isObject = requireIsObject();
    var wellKnownSymbol = requireWellKnownSymbol();
    var SPECIES = wellKnownSymbol('species');
    var $Array = Array;
    // a part of `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    arraySpeciesConstructor = function arraySpeciesConstructor(originalArray) {
        var C;
        if (isArray(originalArray)) {
            C = originalArray.constructor;
            // cross-realm fallback
            if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
            else if (isObject(C)) {
                C = C[SPECIES];
                if (C === null) C = undefined;
            }
        }
        return C === undefined ? $Array : C;
    };
    return arraySpeciesConstructor;
}

var arraySpeciesCreate;
var hasRequiredArraySpeciesCreate;
function requireArraySpeciesCreate() {
    if (hasRequiredArraySpeciesCreate) return arraySpeciesCreate;
    hasRequiredArraySpeciesCreate = 1;
    var arraySpeciesConstructor = requireArraySpeciesConstructor();
    // `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    arraySpeciesCreate = function arraySpeciesCreate(originalArray, length) {
        return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
    };
    return arraySpeciesCreate;
}

var arrayIteration;
var hasRequiredArrayIteration;
function requireArrayIteration() {
    if (hasRequiredArrayIteration) return arrayIteration;
    hasRequiredArrayIteration = 1;
    var bind = requireFunctionBindContext();
    var uncurryThis = requireFunctionUncurryThis();
    var IndexedObject = requireIndexedObject();
    var toObject = requireToObject();
    var lengthOfArrayLike = requireLengthOfArrayLike();
    var arraySpeciesCreate = requireArraySpeciesCreate();
    var push = uncurryThis([].push);
    // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
    var createMethod = function createMethod(TYPE) {
        var IS_MAP = TYPE === 1;
        var IS_FILTER = TYPE === 2;
        var IS_SOME = TYPE === 3;
        var IS_EVERY = TYPE === 4;
        var IS_FIND_INDEX = TYPE === 6;
        var IS_FILTER_REJECT = TYPE === 7;
        var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
        return function($this, callbackfn, that, specificCreate) {
            var O = toObject($this);
            var self = IndexedObject(O);
            var length = lengthOfArrayLike(self);
            var boundFunction = bind(callbackfn, that);
            var index = 0;
            var create = specificCreate || arraySpeciesCreate;
            var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
            var value, result;
            for(; length > index; index++)if (NO_HOLES || index in self) {
                value = self[index];
                result = boundFunction(value, index, O);
                if (TYPE) {
                    if (IS_MAP) target[index] = result; // map
                    else if (result) switch(TYPE){
                        case 3:
                            return true; // some
                        case 5:
                            return value; // find
                        case 6:
                            return index; // findIndex
                        case 2:
                            push(target, value); // filter
                    }
                    else switch(TYPE){
                        case 4:
                            return false; // every
                        case 7:
                            push(target, value); // filterReject
                    }
                }
            }
            return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
        };
    };
    arrayIteration = {
        // `Array.prototype.forEach` method
        // https://tc39.es/ecma262/#sec-array.prototype.foreach
        forEach: createMethod(0),
        // `Array.prototype.map` method
        // https://tc39.es/ecma262/#sec-array.prototype.map
        map: createMethod(1),
        // `Array.prototype.filter` method
        // https://tc39.es/ecma262/#sec-array.prototype.filter
        filter: createMethod(2),
        // `Array.prototype.some` method
        // https://tc39.es/ecma262/#sec-array.prototype.some
        some: createMethod(3),
        // `Array.prototype.every` method
        // https://tc39.es/ecma262/#sec-array.prototype.every
        every: createMethod(4),
        // `Array.prototype.find` method
        // https://tc39.es/ecma262/#sec-array.prototype.find
        find: createMethod(5),
        // `Array.prototype.findIndex` method
        // https://tc39.es/ecma262/#sec-array.prototype.findIndex
        findIndex: createMethod(6),
        // `Array.prototype.filterReject` method
        // https://github.com/tc39/proposal-array-filtering
        filterReject: createMethod(7)
    };
    return arrayIteration;
}

var objectDefineProperties = {};

var hasRequiredObjectDefineProperties;
function requireObjectDefineProperties() {
    if (hasRequiredObjectDefineProperties) return objectDefineProperties;
    hasRequiredObjectDefineProperties = 1;
    var DESCRIPTORS = requireDescriptors();
    var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
    var definePropertyModule = requireObjectDefineProperty();
    var anObject = requireAnObject();
    var toIndexedObject = requireToIndexedObject();
    var objectKeys = requireObjectKeys();
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    // eslint-disable-next-line es/no-object-defineproperties -- safe
    objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var props = toIndexedObject(Properties);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while(length > index)definePropertyModule.f(O, key = keys[index++], props[key]);
        return O;
    };
    return objectDefineProperties;
}

var html;
var hasRequiredHtml;
function requireHtml() {
    if (hasRequiredHtml) return html;
    hasRequiredHtml = 1;
    var getBuiltIn = requireGetBuiltIn();
    html = getBuiltIn('document', 'documentElement');
    return html;
}

var objectCreate;
var hasRequiredObjectCreate;
function requireObjectCreate() {
    if (hasRequiredObjectCreate) return objectCreate;
    hasRequiredObjectCreate = 1;
    /* global ActiveXObject -- old IE, WSH */ var anObject = requireAnObject();
    var definePropertiesModule = requireObjectDefineProperties();
    var enumBugKeys = requireEnumBugKeys();
    var hiddenKeys = requireHiddenKeys();
    var html = requireHtml();
    var documentCreateElement = requireDocumentCreateElement();
    var sharedKey = requireSharedKey();
    var GT = '>';
    var LT = '<';
    var PROTOTYPE = 'prototype';
    var SCRIPT = 'script';
    var IE_PROTO = sharedKey('IE_PROTO');
    var EmptyConstructor = function EmptyConstructor() {};
    var scriptTag = function scriptTag(content) {
        return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
    };
    // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
    var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
        activeXDocument.write(scriptTag(''));
        activeXDocument.close();
        var temp = activeXDocument.parentWindow.Object;
        // eslint-disable-next-line no-useless-assignment -- avoid memory leak
        activeXDocument = null;
        return temp;
    };
    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
        // Thrash, waste and sodomy: IE GC bug
        var iframe = documentCreateElement('iframe');
        var JS = 'java' + SCRIPT + ':';
        var iframeDocument;
        iframe.style.display = 'none';
        html.appendChild(iframe);
        // https://github.com/zloirock/core-js/issues/475
        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag('document.F=Object'));
        iframeDocument.close();
        return iframeDocument.F;
    };
    // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    // avoid IE GC bug
    var activeXDocument;
    var NullProtoObject = function NullProtoObject1() {
        try {
            activeXDocument = new ActiveXObject('htmlfile');
        } catch (error) {}
        NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
         : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH
        var length = enumBugKeys.length;
        while(length--)delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
        return NullProtoObject();
    };
    hiddenKeys[IE_PROTO] = true;
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    // eslint-disable-next-line es/no-object-create -- safe
    objectCreate = Object.create || function create(O, Properties) {
        var result;
        if (O !== null) {
            EmptyConstructor[PROTOTYPE] = anObject(O);
            result = new EmptyConstructor();
            EmptyConstructor[PROTOTYPE] = null;
            // add "__proto__" for Object.getPrototypeOf polyfill
            result[IE_PROTO] = O;
        } else result = NullProtoObject();
        return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
    };
    return objectCreate;
}

var addToUnscopables;
var hasRequiredAddToUnscopables;
function requireAddToUnscopables() {
    if (hasRequiredAddToUnscopables) return addToUnscopables;
    hasRequiredAddToUnscopables = 1;
    var wellKnownSymbol = requireWellKnownSymbol();
    var create = requireObjectCreate();
    var defineProperty = requireObjectDefineProperty().f;
    var UNSCOPABLES = wellKnownSymbol('unscopables');
    var ArrayPrototype = Array.prototype;
    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype[UNSCOPABLES] === undefined) {
        defineProperty(ArrayPrototype, UNSCOPABLES, {
            configurable: true,
            value: create(null)
        });
    }
    // add a key to Array.prototype[@@unscopables]
    addToUnscopables = function addToUnscopables(key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
    };
    return addToUnscopables;
}

var hasRequiredEs_array_find;
function requireEs_array_find() {
    if (hasRequiredEs_array_find) return es_array_find;
    hasRequiredEs_array_find = 1;
    var $ = require_export();
    var $find = requireArrayIteration().find;
    var addToUnscopables = requireAddToUnscopables();
    var FIND = 'find';
    var SKIPS_HOLES = true;
    // Shouldn't skip holes
    // eslint-disable-next-line es/no-array-prototype-find -- testing
    if (FIND in []) Array(1)[FIND](function() {
        SKIPS_HOLES = false;
    });
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    $({
        target: 'Array',
        proto: true,
        forced: SKIPS_HOLES
    }, {
        find: function find(callbackfn /* , that = undefined */ ) {
            return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        }
    });
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables(FIND);
    return es_array_find;
}

var entryUnbind;
var hasRequiredEntryUnbind;
function requireEntryUnbind() {
    if (hasRequiredEntryUnbind) return entryUnbind;
    hasRequiredEntryUnbind = 1;
    var globalThis = requireGlobalThis();
    var uncurryThis = requireFunctionUncurryThis();
    entryUnbind = function entryUnbind(CONSTRUCTOR, METHOD) {
        return uncurryThis(globalThis[CONSTRUCTOR].prototype[METHOD]);
    };
    return entryUnbind;
}

var find$2;
var hasRequiredFind$2;
function requireFind$2() {
    if (hasRequiredFind$2) return find$2;
    hasRequiredFind$2 = 1;
    requireEs_array_find();
    var entryUnbind = requireEntryUnbind();
    find$2 = entryUnbind('Array', 'find');
    return find$2;
}

var find$1;
var hasRequiredFind$1;
function requireFind$1() {
    if (hasRequiredFind$1) return find$1;
    hasRequiredFind$1 = 1;
    var parent = requireFind$2();
    find$1 = parent;
    return find$1;
}

var find;
var hasRequiredFind;
function requireFind() {
    if (hasRequiredFind) return find;
    hasRequiredFind = 1;
    var parent = requireFind$1();
    find = parent;
    return find;
}

var bufferV6Polyfill = {};

var hasRequiredBufferV6Polyfill;
function requireBufferV6Polyfill() {
    if (hasRequiredBufferV6Polyfill) return bufferV6Polyfill;
    hasRequiredBufferV6Polyfill = 1;
    (function() {
        if (Number(process.version.match(/^v(\d+\.\d+)/)[1]) >= 6.0) {
            return;
        }
        function newBuffer(data, encoding, len) {
            return new Buffer(data, encoding, len);
        }
        function newSlowBuffer(data, encoding, len) {
            var SlowBuffer = require$$0.SlowBuffer;
            return new SlowBuffer(data, encoding, len);
        }
        if (!Buffer.alloc) {
            Buffer.alloc = newBuffer;
        }
        if (!Buffer.allocUnsafe) {
            Buffer.allocUnsafe = newBuffer;
        }
        if (!Buffer.allocUnsafeSlow) {
            Buffer.allocUnsafeSlow = newSlowBuffer;
        }
        if (!Buffer.from) {
            Buffer.from = newBuffer;
        }
        try {
            Buffer.from('1337', 'hex');
        } catch (e) {
            // wish I could do something here to fix the broken Buffer.from
            try {
                Buffer.from = newBuffer;
            } catch (e) {
                // but alas, I cannot
                console.warn("Your node version has buggy Buffer.from support. Please update to node >= v4.5 or >= v6.3");
            }
        }
    })();
    return bufferV6Polyfill;
}

var crossSpawn6_0_5 = {
    exports: {}
};

var src$1;
var hasRequiredSrc$1;
function requireSrc$1() {
    if (hasRequiredSrc$1) return src$1;
    hasRequiredSrc$1 = 1;
    /**
	 * Tries to execute a function and discards any error that occurs.
	 * @param {Function} fn - Function that might or might not throw an error.
	 * @returns {?*} Return-value of the function when no error occurred.
	 */ src$1 = function src(fn) {
        try {
            return fn();
        } catch (e) {}
    };
    return src$1;
}

var windows;
var hasRequiredWindows;
function requireWindows() {
    if (hasRequiredWindows) return windows;
    hasRequiredWindows = 1;
    windows = isexe;
    isexe.sync = sync;
    var fs = require$$0$1;
    function checkPathExt(path, options) {
        var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;
        if (!pathext) {
            return true;
        }
        pathext = pathext.split(';');
        if (pathext.indexOf('') !== -1) {
            return true;
        }
        for(var i = 0; i < pathext.length; i++){
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
        fs.stat(path, function(er, stat) {
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
    var fs = require$$0$1;
    function isexe(path, options, cb) {
        fs.stat(path, function(er, stat) {
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

var isexe_1;
var hasRequiredIsexe;
function requireIsexe() {
    if (hasRequiredIsexe) return isexe_1;
    hasRequiredIsexe = 1;
    var core;
    if (process.platform === 'win32' || commonjsGlobal.TESTING_WINDOWS) {
        core = requireWindows();
    } else {
        core = requireMode();
    }
    isexe_1 = isexe;
    isexe.sync = sync;
    function isexe(path, options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = {};
        }
        if (!cb) {
            if (typeof Promise !== 'function') {
                throw new TypeError('callback not provided');
            }
            return new Promise(function(resolve, reject) {
                isexe(path, options || {}, function(er, is) {
                    if (er) {
                        reject(er);
                    } else {
                        resolve(is);
                    }
                });
            });
        }
        core(path, options || {}, function(er, is) {
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
    function sync(path, options) {
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
    return isexe_1;
}

var which_1;
var hasRequiredWhich;
function requireWhich() {
    if (hasRequiredWhich) return which_1;
    hasRequiredWhich = 1;
    which_1 = which;
    which.sync = whichSync;
    var isWindows = process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys';
    var path = require$$0$2;
    var COLON = isWindows ? ';' : ':';
    var isexe = requireIsexe();
    function getNotFoundError(cmd) {
        var er = new Error('not found: ' + cmd);
        er.code = 'ENOENT';
        return er;
    }
    function getPathInfo(cmd, opt) {
        var colon = opt.colon || COLON;
        var pathEnv = opt.path || process.env.PATH || '';
        var pathExt = [
            ''
        ];
        pathEnv = pathEnv.split(colon);
        var pathExtExe = '';
        if (isWindows) {
            pathEnv.unshift(process.cwd());
            pathExtExe = opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM';
            pathExt = pathExtExe.split(colon);
            // Always test the cmd itself first.  isexe will check to make sure
            // it's found in the pathExt set.
            if (cmd.indexOf('.') !== -1 && pathExt[0] !== '') pathExt.unshift('');
        }
        // If it has a slash, then we don't bother searching the pathenv.
        // just check the file itself, and that's it.
        if (cmd.match(/\//) || isWindows && cmd.match(/\\/)) pathEnv = [
            ''
        ];
        return {
            env: pathEnv,
            ext: pathExt,
            extExe: pathExtExe
        };
    }
    function which(cmd, opt, cb) {
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
                if (opt.all && found.length) return cb(null, found);
                else return cb(getNotFoundError(cmd));
            }
            var pathPart = pathEnv[i];
            if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);
            var p = path.join(pathPart, cmd);
            if (!pathPart && /^\.[\\\/]/.test(cmd)) {
                p = cmd.slice(0, 2) + p;
            }
            (function E(ii, ll) {
                if (ii === ll) return F(i + 1, l);
                var ext = pathExt[ii];
                isexe(p + ext, {
                    pathExt: pathExtExe
                }, function(er, is) {
                    if (!er && is) {
                        if (opt.all) found.push(p + ext);
                        else return cb(null, p + ext);
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
        for(var i = 0, l = pathEnv.length; i < l; i++){
            var pathPart = pathEnv[i];
            if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);
            var p = path.join(pathPart, cmd);
            if (!pathPart && /^\.[\\\/]/.test(cmd)) {
                p = cmd.slice(0, 2) + p;
            }
            for(var j = 0, ll = pathExt.length; j < ll; j++){
                var cur = p + pathExt[j];
                var is;
                try {
                    is = isexe.sync(cur, {
                        pathExt: pathExtExe
                    });
                    if (is) {
                        if (opt.all) found.push(cur);
                        else return cur;
                    }
                } catch (ex) {}
            }
        }
        if (opt.all && found.length) return found;
        if (opt.nothrow) return null;
        throw getNotFoundError(cmd);
    }
    return which_1;
}

var pathKey;
var hasRequiredPathKey;
function requirePathKey() {
    if (hasRequiredPathKey) return pathKey;
    hasRequiredPathKey = 1;
    pathKey = function(opts) {
        opts = opts || {};
        var env = opts.env || process.env;
        var platform = opts.platform || process.platform;
        if (platform !== 'win32') {
            return 'PATH';
        }
        return Object.keys(env).find(function(x) {
            return x.toUpperCase() === 'PATH';
        }) || 'Path';
    };
    return pathKey;
}

var resolveCommand_1;
var hasRequiredResolveCommand;
function requireResolveCommand() {
    if (hasRequiredResolveCommand) return resolveCommand_1;
    hasRequiredResolveCommand = 1;
    var path = require$$0$2;
    var which = requireWhich();
    var pathKey = requirePathKey()();
    function resolveCommandAttempt(parsed, withoutPathExt) {
        var cwd = process.cwd();
        var hasCustomCwd = parsed.options.cwd != null;
        // If a custom `cwd` was specified, we need to change the process cwd
        // because `which` will do stat calls but does not support a custom cwd
        if (hasCustomCwd) {
            try {
                process.chdir(parsed.options.cwd);
            } catch (err) {
            /* Empty */ }
        }
        var resolved;
        try {
            resolved = which.sync(parsed.command, {
                path: (parsed.options.env || process.env)[pathKey],
                pathExt: withoutPathExt ? path.delimiter : undefined
            });
        } catch (e) {
        /* Empty */ } finally{
            process.chdir(cwd);
        }
        // If we successfully resolved, ensure that an absolute path is returned
        // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
        if (resolved) {
            resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
        }
        return resolved;
    }
    function resolveCommand(parsed) {
        return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    resolveCommand_1 = resolveCommand;
    return resolveCommand_1;
}

var _escape = {};

var hasRequired_escape;
function require_escape() {
    if (hasRequired_escape) return _escape;
    hasRequired_escape = 1;
    // See http://www.robvanderwoude.com/escapechars.php
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
        // Escape meta chars
        arg = arg.replace(metaCharsRegExp, '^$1');
        return arg;
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
        // Convert to string
        arg = "".concat(arg);
        // Algorithm below is based on https://qntm.org/cmd
        // Sequence of backslashes followed by a double quote:
        // double up all the backslashes and escape the double quote
        arg = arg.replace(/(\\*)"/g, '$1$1\\"');
        // Sequence of backslashes followed by the end of the string
        // (which will become a double quote later):
        // double up all the backslashes
        arg = arg.replace(/(\\*)$/, '$1$1');
        // All other backslashes occur literally
        // Quote the whole thing:
        arg = '"'.concat(arg, '"');
        // Escape meta chars
        arg = arg.replace(metaCharsRegExp, '^$1');
        // Double escape meta chars if necessary
        if (doubleEscapeMetaChars) {
            arg = arg.replace(metaCharsRegExp, '^$1');
        }
        return arg;
    }
    _escape.command = escapeCommand;
    _escape.argument = escapeArgument;
    return _escape;
}

var shebangRegex;
var hasRequiredShebangRegex;
function requireShebangRegex() {
    if (hasRequiredShebangRegex) return shebangRegex;
    hasRequiredShebangRegex = 1;
    shebangRegex = /^#!.*/;
    return shebangRegex;
}

var shebangCommand;
var hasRequiredShebangCommand;
function requireShebangCommand() {
    if (hasRequiredShebangCommand) return shebangCommand;
    hasRequiredShebangCommand = 1;
    var shebangRegex = requireShebangRegex();
    shebangCommand = function shebangCommand(str) {
        var match = str.match(shebangRegex);
        if (!match) {
            return null;
        }
        var arr = match[0].replace(/#! ?/, '').split(' ');
        var bin = arr[0].split('/').pop();
        var arg = arr[1];
        return bin === 'env' ? arg : bin + (arg ? ' ' + arg : '');
    };
    return shebangCommand;
}

var readShebang_1;
var hasRequiredReadShebang;
function requireReadShebang() {
    if (hasRequiredReadShebang) return readShebang_1;
    hasRequiredReadShebang = 1;
    var fs = require$$0$1;
    var shebangCommand = requireShebangCommand();
    function readShebang(command) {
        // Read the first 150 bytes from the file
        var size = 150;
        var buffer;
        if (Buffer.alloc) {
            // Node.js v4.5+ / v5.10+
            buffer = Buffer.alloc(size);
        } else {
            // Old Node.js API
            buffer = new Buffer(size);
            buffer.fill(0); // zero-fill
        }
        var fd;
        try {
            fd = fs.openSync(command, 'r');
            fs.readSync(fd, buffer, 0, size, 0);
            fs.closeSync(fd);
        } catch (e) {}
        // Attempt to extract shebang (null is returned if not a shebang)
        return shebangCommand(buffer.toString());
    }
    readShebang_1 = readShebang;
    return readShebang_1;
}

var semver = {
    exports: {}
};

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var hasRequiredSemver;
function requireSemver() {
    if (hasRequiredSemver) return semver.exports;
    hasRequiredSemver = 1;
    (function(module, exports) {
        exports = module.exports = SemVer;
        var debug;
        /* istanbul ignore next */ if ((typeof process === "undefined" ? "undefined" : _type_of(process)) === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
            debug = function debug() {
                var args = Array.prototype.slice.call(arguments, 0);
                args.unshift('SEMVER');
                console.log.apply(console, args);
            };
        } else {
            debug = function debug() {};
        }
        // Note: this is the semver.org version of the spec that it implements
        // Not necessarily the package version of this code.
        exports.SEMVER_SPEC_VERSION = '2.0.0';
        var MAX_LENGTH = 256;
        var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
        // Max safe segment length for coercion.
        var MAX_SAFE_COMPONENT_LENGTH = 16;
        var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
        // The actual regexps go on exports.re
        var re = exports.re = [];
        var safeRe = exports.safeRe = [];
        var src = exports.src = [];
        var R = 0;
        var LETTERDASHNUMBER = '[a-zA-Z0-9-]';
        // Replace some greedy regex tokens to prevent regex dos issues. These regex are
        // used internally via the safeRe object since all inputs in this library get
        // normalized first to trim and collapse all extra whitespace. The original
        // regexes are exported for userland consumption and lower level usage. A
        // future breaking change could export the safer regex only with a note that
        // all input should have extra whitespace removed.
        var safeRegexReplacements = [
            [
                '\\s',
                1
            ],
            [
                '\\d',
                MAX_LENGTH
            ],
            [
                LETTERDASHNUMBER,
                MAX_SAFE_BUILD_LENGTH
            ]
        ];
        function makeSafeRe(value) {
            for(var i = 0; i < safeRegexReplacements.length; i++){
                var token = safeRegexReplacements[i][0];
                var max = safeRegexReplacements[i][1];
                value = value.split(token + '*').join(token + '{0,' + max + '}').split(token + '+').join(token + '{1,' + max + '}');
            }
            return value;
        }
        // The following Regular Expressions can be used for tokenizing,
        // validating, and parsing SemVer version strings.
        // ## Numeric Identifier
        // A single `0`, or a non-zero digit followed by zero or more digits.
        var NUMERICIDENTIFIER = R++;
        src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
        var NUMERICIDENTIFIERLOOSE = R++;
        src[NUMERICIDENTIFIERLOOSE] = '\\d+';
        // ## Non-numeric Identifier
        // Zero or more digits, followed by a letter or hyphen, and then zero or
        // more letters, digits, or hyphens.
        var NONNUMERICIDENTIFIER = R++;
        src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-]' + LETTERDASHNUMBER + '*';
        // ## Main Version
        // Three dot-separated numeric identifiers.
        var MAINVERSION = R++;
        src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';
        var MAINVERSIONLOOSE = R++;
        src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')';
        // ## Pre-release Version Identifier
        // A numeric identifier, or a non-numeric identifier.
        var PRERELEASEIDENTIFIER = R++;
        src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';
        var PRERELEASEIDENTIFIERLOOSE = R++;
        src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';
        // ## Pre-release Version
        // Hyphen, followed by one or more dot-separated pre-release version
        // identifiers.
        var PRERELEASE = R++;
        src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
        var PRERELEASELOOSE = R++;
        src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';
        // ## Build Metadata Identifier
        // Any combination of digits, letters, or hyphens.
        var BUILDIDENTIFIER = R++;
        src[BUILDIDENTIFIER] = LETTERDASHNUMBER + '+';
        // ## Build Metadata
        // Plus sign, followed by one or more period-separated build metadata
        // identifiers.
        var BUILD = R++;
        src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';
        // ## Full Version String
        // A main version, followed optionally by a pre-release version and
        // build metadata.
        // Note that the only major, minor, patch, and pre-release sections of
        // the version string are capturing groups.  The build metadata is not a
        // capturing group, because it should not ever be used in version
        // comparison.
        var FULL = R++;
        var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';
        src[FULL] = '^' + FULLPLAIN + '$';
        // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
        // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
        // common in the npm registry.
        var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';
        var LOOSE = R++;
        src[LOOSE] = '^' + LOOSEPLAIN + '$';
        var GTLT = R++;
        src[GTLT] = '((?:<|>)?=?)';
        // Something like "2.*" or "1.2.x".
        // Note that "x.x" is a valid xRange identifer, meaning "any version"
        // Only the first item is strictly required.
        var XRANGEIDENTIFIERLOOSE = R++;
        src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
        var XRANGEIDENTIFIER = R++;
        src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
        var XRANGEPLAIN = R++;
        src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';
        var XRANGEPLAINLOOSE = R++;
        src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';
        var XRANGE = R++;
        src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
        var XRANGELOOSE = R++;
        src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';
        // Coercion.
        // Extract anything that could conceivably be a part of a valid semver
        var COERCE = R++;
        src[COERCE] = '(?:^|[^\\d])' + '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:$|[^\\d])';
        // Tilde ranges.
        // Meaning is "reasonably at or greater than"
        var LONETILDE = R++;
        src[LONETILDE] = '(?:~>?)';
        var TILDETRIM = R++;
        src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
        re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
        safeRe[TILDETRIM] = new RegExp(makeSafeRe(src[TILDETRIM]), 'g');
        var tildeTrimReplace = '$1~';
        var TILDE = R++;
        src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
        var TILDELOOSE = R++;
        src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';
        // Caret ranges.
        // Meaning is "at least and backwards compatible with"
        var LONECARET = R++;
        src[LONECARET] = '(?:\\^)';
        var CARETTRIM = R++;
        src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
        re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
        safeRe[CARETTRIM] = new RegExp(makeSafeRe(src[CARETTRIM]), 'g');
        var caretTrimReplace = '$1^';
        var CARET = R++;
        src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
        var CARETLOOSE = R++;
        src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';
        // A simple gt/lt/eq thing, or just "" to indicate "any version"
        var COMPARATORLOOSE = R++;
        src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
        var COMPARATOR = R++;
        src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';
        // An expression to strip any whitespace between the gtlt and the thing
        // it modifies, so that `> 1.2.3` ==> `>1.2.3`
        var COMPARATORTRIM = R++;
        src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';
        // this one has to use the /g flag
        re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
        safeRe[COMPARATORTRIM] = new RegExp(makeSafeRe(src[COMPARATORTRIM]), 'g');
        var comparatorTrimReplace = '$1$2$3';
        // Something like `1.2.3 - 1.2.4`
        // Note that these all use the loose form, because they'll be
        // checked against either the strict or loose comparator form
        // later.
        var HYPHENRANGE = R++;
        src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';
        var HYPHENRANGELOOSE = R++;
        src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$';
        // Star ranges basically just allow anything at all.
        var STAR = R++;
        src[STAR] = '(<|>)?=?\\s*\\*';
        // Compile to actual regexp objects.
        // All are flag-free, unless they were created above with a flag.
        for(var i = 0; i < R; i++){
            debug(i, src[i]);
            if (!re[i]) {
                re[i] = new RegExp(src[i]);
                // Replace all greedy whitespace to prevent regex dos issues. These regex are
                // used internally via the safeRe object since all inputs in this library get
                // normalized first to trim and collapse all extra whitespace. The original
                // regexes are exported for userland consumption and lower level usage. A
                // future breaking change could export the safer regex only with a note that
                // all input should have extra whitespace removed.
                safeRe[i] = new RegExp(makeSafeRe(src[i]));
            }
        }
        exports.parse = parse;
        function parse(version, options) {
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            if (_instanceof(version, SemVer)) {
                return version;
            }
            if (typeof version !== 'string') {
                return null;
            }
            if (version.length > MAX_LENGTH) {
                return null;
            }
            var r = options.loose ? safeRe[LOOSE] : safeRe[FULL];
            if (!r.test(version)) {
                return null;
            }
            try {
                return new SemVer(version, options);
            } catch (er) {
                return null;
            }
        }
        exports.valid = valid;
        function valid(version, options) {
            var v = parse(version, options);
            return v ? v.version : null;
        }
        exports.clean = clean;
        function clean(version, options) {
            var s = parse(version.trim().replace(/^[=v]+/, ''), options);
            return s ? s.version : null;
        }
        exports.SemVer = SemVer;
        function SemVer(version, options) {
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            if (_instanceof(version, SemVer)) {
                if (version.loose === options.loose) {
                    return version;
                } else {
                    version = version.version;
                }
            } else if (typeof version !== 'string') {
                throw new TypeError('Invalid Version: ' + version);
            }
            if (version.length > MAX_LENGTH) {
                throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
            }
            if (!_instanceof(this, SemVer)) {
                return new SemVer(version, options);
            }
            debug('SemVer', version, options);
            this.options = options;
            this.loose = !!options.loose;
            var m = version.trim().match(options.loose ? safeRe[LOOSE] : safeRe[FULL]);
            if (!m) {
                throw new TypeError('Invalid Version: ' + version);
            }
            this.raw = version;
            // these are actually numbers
            this.major = +m[1];
            this.minor = +m[2];
            this.patch = +m[3];
            if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
                throw new TypeError('Invalid major version');
            }
            if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
                throw new TypeError('Invalid minor version');
            }
            if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
                throw new TypeError('Invalid patch version');
            }
            // numberify any prerelease numeric ids
            if (!m[4]) {
                this.prerelease = [];
            } else {
                this.prerelease = m[4].split('.').map(function(id) {
                    if (/^[0-9]+$/.test(id)) {
                        var num = +id;
                        if (num >= 0 && num < MAX_SAFE_INTEGER) {
                            return num;
                        }
                    }
                    return id;
                });
            }
            this.build = m[5] ? m[5].split('.') : [];
            this.format();
        }
        SemVer.prototype.format = function() {
            this.version = this.major + '.' + this.minor + '.' + this.patch;
            if (this.prerelease.length) {
                this.version += '-' + this.prerelease.join('.');
            }
            return this.version;
        };
        SemVer.prototype.toString = function() {
            return this.version;
        };
        SemVer.prototype.compare = function(other) {
            debug('SemVer.compare', this.version, this.options, other);
            if (!_instanceof(other, SemVer)) {
                other = new SemVer(other, this.options);
            }
            return this.compareMain(other) || this.comparePre(other);
        };
        SemVer.prototype.compareMain = function(other) {
            if (!_instanceof(other, SemVer)) {
                other = new SemVer(other, this.options);
            }
            return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
        };
        SemVer.prototype.comparePre = function(other) {
            if (!_instanceof(other, SemVer)) {
                other = new SemVer(other, this.options);
            }
            // NOT having a prerelease is > having one
            if (this.prerelease.length && !other.prerelease.length) {
                return -1;
            } else if (!this.prerelease.length && other.prerelease.length) {
                return 1;
            } else if (!this.prerelease.length && !other.prerelease.length) {
                return 0;
            }
            var i = 0;
            do {
                var a = this.prerelease[i];
                var b = other.prerelease[i];
                debug('prerelease compare', i, a, b);
                if (a === undefined && b === undefined) {
                    return 0;
                } else if (b === undefined) {
                    return 1;
                } else if (a === undefined) {
                    return -1;
                } else if (a === b) {
                    continue;
                } else {
                    return compareIdentifiers(a, b);
                }
            }while (++i);
        };
        // preminor will bump the version up to the next minor release, and immediately
        // down to pre-release. premajor and prepatch work the same way.
        SemVer.prototype.inc = function(release, identifier) {
            switch(release){
                case 'premajor':
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor = 0;
                    this.major++;
                    this.inc('pre', identifier);
                    break;
                case 'preminor':
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor++;
                    this.inc('pre', identifier);
                    break;
                case 'prepatch':
                    // If this is already a prerelease, it will bump to the next version
                    // drop any prereleases that might already exist, since they are not
                    // relevant at this point.
                    this.prerelease.length = 0;
                    this.inc('patch', identifier);
                    this.inc('pre', identifier);
                    break;
                // If the input is a non-prerelease version, this acts the same as
                // prepatch.
                case 'prerelease':
                    if (this.prerelease.length === 0) {
                        this.inc('patch', identifier);
                    }
                    this.inc('pre', identifier);
                    break;
                case 'major':
                    // If this is a pre-major version, bump up to the same major version.
                    // Otherwise increment major.
                    // 1.0.0-5 bumps to 1.0.0
                    // 1.1.0 bumps to 2.0.0
                    if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                        this.major++;
                    }
                    this.minor = 0;
                    this.patch = 0;
                    this.prerelease = [];
                    break;
                case 'minor':
                    // If this is a pre-minor version, bump up to the same minor version.
                    // Otherwise increment minor.
                    // 1.2.0-5 bumps to 1.2.0
                    // 1.2.1 bumps to 1.3.0
                    if (this.patch !== 0 || this.prerelease.length === 0) {
                        this.minor++;
                    }
                    this.patch = 0;
                    this.prerelease = [];
                    break;
                case 'patch':
                    // If this is not a pre-release version, it will increment the patch.
                    // If it is a pre-release it will bump up to the same patch version.
                    // 1.2.0-5 patches to 1.2.0
                    // 1.2.0 patches to 1.2.1
                    if (this.prerelease.length === 0) {
                        this.patch++;
                    }
                    this.prerelease = [];
                    break;
                // This probably shouldn't be used publicly.
                // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
                case 'pre':
                    if (this.prerelease.length === 0) {
                        this.prerelease = [
                            0
                        ];
                    } else {
                        var i = this.prerelease.length;
                        while(--i >= 0){
                            if (typeof this.prerelease[i] === 'number') {
                                this.prerelease[i]++;
                                i = -2;
                            }
                        }
                        if (i === -1) {
                            // didn't increment anything
                            this.prerelease.push(0);
                        }
                    }
                    if (identifier) {
                        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                        if (this.prerelease[0] === identifier) {
                            if (isNaN(this.prerelease[1])) {
                                this.prerelease = [
                                    identifier,
                                    0
                                ];
                            }
                        } else {
                            this.prerelease = [
                                identifier,
                                0
                            ];
                        }
                    }
                    break;
                default:
                    throw new Error('invalid increment argument: ' + release);
            }
            this.format();
            this.raw = this.version;
            return this;
        };
        exports.inc = inc;
        function inc(version, release, loose, identifier) {
            if (typeof loose === 'string') {
                identifier = loose;
                loose = undefined;
            }
            try {
                return new SemVer(version, loose).inc(release, identifier).version;
            } catch (er) {
                return null;
            }
        }
        exports.diff = diff;
        function diff(version1, version2) {
            if (eq(version1, version2)) {
                return null;
            } else {
                var v1 = parse(version1);
                var v2 = parse(version2);
                var prefix = '';
                if (v1.prerelease.length || v2.prerelease.length) {
                    prefix = 'pre';
                    var defaultResult = 'prerelease';
                }
                for(var key in v1){
                    if (key === 'major' || key === 'minor' || key === 'patch') {
                        if (v1[key] !== v2[key]) {
                            return prefix + key;
                        }
                    }
                }
                return defaultResult // may be undefined
                ;
            }
        }
        exports.compareIdentifiers = compareIdentifiers;
        var numeric = /^[0-9]+$/;
        function compareIdentifiers(a, b) {
            var anum = numeric.test(a);
            var bnum = numeric.test(b);
            if (anum && bnum) {
                a = +a;
                b = +b;
            }
            return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
        }
        exports.rcompareIdentifiers = rcompareIdentifiers;
        function rcompareIdentifiers(a, b) {
            return compareIdentifiers(b, a);
        }
        exports.major = major;
        function major(a, loose) {
            return new SemVer(a, loose).major;
        }
        exports.minor = minor;
        function minor(a, loose) {
            return new SemVer(a, loose).minor;
        }
        exports.patch = patch;
        function patch(a, loose) {
            return new SemVer(a, loose).patch;
        }
        exports.compare = compare;
        function compare(a, b, loose) {
            return new SemVer(a, loose).compare(new SemVer(b, loose));
        }
        exports.compareLoose = compareLoose;
        function compareLoose(a, b) {
            return compare(a, b, true);
        }
        exports.rcompare = rcompare;
        function rcompare(a, b, loose) {
            return compare(b, a, loose);
        }
        exports.sort = sort;
        function sort(list, loose) {
            return list.sort(function(a, b) {
                return exports.compare(a, b, loose);
            });
        }
        exports.rsort = rsort;
        function rsort(list, loose) {
            return list.sort(function(a, b) {
                return exports.rcompare(a, b, loose);
            });
        }
        exports.gt = gt;
        function gt(a, b, loose) {
            return compare(a, b, loose) > 0;
        }
        exports.lt = lt;
        function lt(a, b, loose) {
            return compare(a, b, loose) < 0;
        }
        exports.eq = eq;
        function eq(a, b, loose) {
            return compare(a, b, loose) === 0;
        }
        exports.neq = neq;
        function neq(a, b, loose) {
            return compare(a, b, loose) !== 0;
        }
        exports.gte = gte;
        function gte(a, b, loose) {
            return compare(a, b, loose) >= 0;
        }
        exports.lte = lte;
        function lte(a, b, loose) {
            return compare(a, b, loose) <= 0;
        }
        exports.cmp = cmp;
        function cmp(a, op, b, loose) {
            switch(op){
                case '===':
                    if ((typeof a === "undefined" ? "undefined" : _type_of(a)) === 'object') a = a.version;
                    if ((typeof b === "undefined" ? "undefined" : _type_of(b)) === 'object') b = b.version;
                    return a === b;
                case '!==':
                    if ((typeof a === "undefined" ? "undefined" : _type_of(a)) === 'object') a = a.version;
                    if ((typeof b === "undefined" ? "undefined" : _type_of(b)) === 'object') b = b.version;
                    return a !== b;
                case '':
                case '=':
                case '==':
                    return eq(a, b, loose);
                case '!=':
                    return neq(a, b, loose);
                case '>':
                    return gt(a, b, loose);
                case '>=':
                    return gte(a, b, loose);
                case '<':
                    return lt(a, b, loose);
                case '<=':
                    return lte(a, b, loose);
                default:
                    throw new TypeError('Invalid operator: ' + op);
            }
        }
        exports.Comparator = Comparator;
        function Comparator(comp, options) {
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            if (_instanceof(comp, Comparator)) {
                if (comp.loose === !!options.loose) {
                    return comp;
                } else {
                    comp = comp.value;
                }
            }
            if (!_instanceof(this, Comparator)) {
                return new Comparator(comp, options);
            }
            comp = comp.trim().split(/\s+/).join(' ');
            debug('comparator', comp, options);
            this.options = options;
            this.loose = !!options.loose;
            this.parse(comp);
            if (this.semver === ANY) {
                this.value = '';
            } else {
                this.value = this.operator + this.semver.version;
            }
            debug('comp', this);
        }
        var ANY = {};
        Comparator.prototype.parse = function(comp) {
            var r = this.options.loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
            var m = comp.match(r);
            if (!m) {
                throw new TypeError('Invalid comparator: ' + comp);
            }
            this.operator = m[1];
            if (this.operator === '=') {
                this.operator = '';
            }
            // if it literally is just '>' or '' then allow anything.
            if (!m[2]) {
                this.semver = ANY;
            } else {
                this.semver = new SemVer(m[2], this.options.loose);
            }
        };
        Comparator.prototype.toString = function() {
            return this.value;
        };
        Comparator.prototype.test = function(version) {
            debug('Comparator.test', version, this.options.loose);
            if (this.semver === ANY) {
                return true;
            }
            if (typeof version === 'string') {
                version = new SemVer(version, this.options);
            }
            return cmp(version, this.operator, this.semver, this.options);
        };
        Comparator.prototype.intersects = function(comp, options) {
            if (!_instanceof(comp, Comparator)) {
                throw new TypeError('a Comparator is required');
            }
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            var rangeTmp;
            if (this.operator === '') {
                rangeTmp = new Range(comp.value, options);
                return satisfies(this.value, rangeTmp, options);
            } else if (comp.operator === '') {
                rangeTmp = new Range(this.value, options);
                return satisfies(comp.semver, rangeTmp, options);
            }
            var sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
            var sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
            var sameSemVer = this.semver.version === comp.semver.version;
            var differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
            var oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
            var oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
            return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
        };
        exports.Range = Range;
        function Range(range, options) {
            if (!options || (typeof options === "undefined" ? "undefined" : _type_of(options)) !== 'object') {
                options = {
                    loose: !!options,
                    includePrerelease: false
                };
            }
            if (_instanceof(range, Range)) {
                if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
                    return range;
                } else {
                    return new Range(range.raw, options);
                }
            }
            if (_instanceof(range, Comparator)) {
                return new Range(range.value, options);
            }
            if (!_instanceof(this, Range)) {
                return new Range(range, options);
            }
            this.options = options;
            this.loose = !!options.loose;
            this.includePrerelease = !!options.includePrerelease;
            // First reduce all whitespace as much as possible so we do not have to rely
            // on potentially slow regexes like \s*. This is then stored and used for
            // future error messages as well.
            this.raw = range.trim().split(/\s+/).join(' ');
            // First, split based on boolean or ||
            this.set = this.raw.split('||').map(function(range) {
                return this.parseRange(range.trim());
            }, this).filter(function(c) {
                // throw out any that are not relevant for whatever reason
                return c.length;
            });
            if (!this.set.length) {
                throw new TypeError('Invalid SemVer Range: ' + this.raw);
            }
            this.format();
        }
        Range.prototype.format = function() {
            this.range = this.set.map(function(comps) {
                return comps.join(' ').trim();
            }).join('||').trim();
            return this.range;
        };
        Range.prototype.toString = function() {
            return this.range;
        };
        Range.prototype.parseRange = function(range) {
            var loose = this.options.loose;
            // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
            var hr = loose ? safeRe[HYPHENRANGELOOSE] : safeRe[HYPHENRANGE];
            range = range.replace(hr, hyphenReplace);
            debug('hyphen replace', range);
            // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
            range = range.replace(safeRe[COMPARATORTRIM], comparatorTrimReplace);
            debug('comparator trim', range, safeRe[COMPARATORTRIM]);
            // `~ 1.2.3` => `~1.2.3`
            range = range.replace(safeRe[TILDETRIM], tildeTrimReplace);
            // `^ 1.2.3` => `^1.2.3`
            range = range.replace(safeRe[CARETTRIM], caretTrimReplace);
            // At this point, the range is completely trimmed and
            // ready to be split into comparators.
            var compRe = loose ? safeRe[COMPARATORLOOSE] : safeRe[COMPARATOR];
            var set = range.split(' ').map(function(comp) {
                return parseComparator(comp, this.options);
            }, this).join(' ').split(/\s+/);
            if (this.options.loose) {
                // in loose mode, throw out any that are not valid comparators
                set = set.filter(function(comp) {
                    return !!comp.match(compRe);
                });
            }
            set = set.map(function(comp) {
                return new Comparator(comp, this.options);
            }, this);
            return set;
        };
        Range.prototype.intersects = function(range, options) {
            if (!_instanceof(range, Range)) {
                throw new TypeError('a Range is required');
            }
            return this.set.some(function(thisComparators) {
                return thisComparators.every(function(thisComparator) {
                    return range.set.some(function(rangeComparators) {
                        return rangeComparators.every(function(rangeComparator) {
                            return thisComparator.intersects(rangeComparator, options);
                        });
                    });
                });
            });
        };
        // Mostly just for testing and legacy API reasons
        exports.toComparators = toComparators;
        function toComparators(range, options) {
            return new Range(range, options).set.map(function(comp) {
                return comp.map(function(c) {
                    return c.value;
                }).join(' ').trim().split(' ');
            });
        }
        // comprised of xranges, tildes, stars, and gtlt's at this point.
        // already replaced the hyphen ranges
        // turn into a set of JUST comparators.
        function parseComparator(comp, options) {
            debug('comp', comp, options);
            comp = replaceCarets(comp, options);
            debug('caret', comp);
            comp = replaceTildes(comp, options);
            debug('tildes', comp);
            comp = replaceXRanges(comp, options);
            debug('xrange', comp);
            comp = replaceStars(comp, options);
            debug('stars', comp);
            return comp;
        }
        function isX(id) {
            return !id || id.toLowerCase() === 'x' || id === '*';
        }
        // ~, ~> --> * (any, kinda silly)
        // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
        // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
        // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
        // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
        // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
        function replaceTildes(comp, options) {
            return comp.trim().split(/\s+/).map(function(comp) {
                return replaceTilde(comp, options);
            }).join(' ');
        }
        function replaceTilde(comp, options) {
            var r = options.loose ? safeRe[TILDELOOSE] : safeRe[TILDE];
            return comp.replace(r, function(_, M, m, p, pr) {
                debug('tilde', comp, _, M, m, p, pr);
                var ret;
                if (isX(M)) {
                    ret = '';
                } else if (isX(m)) {
                    ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
                } else if (isX(p)) {
                    // ~1.2 == >=1.2.0 <1.3.0
                    ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
                } else if (pr) {
                    debug('replaceTilde pr', pr);
                    ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + (+m + 1) + '.0';
                } else {
                    // ~1.2.3 == >=1.2.3 <1.3.0
                    ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
                }
                debug('tilde return', ret);
                return ret;
            });
        }
        // ^ --> * (any, kinda silly)
        // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
        // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
        // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
        // ^1.2.3 --> >=1.2.3 <2.0.0
        // ^1.2.0 --> >=1.2.0 <2.0.0
        function replaceCarets(comp, options) {
            return comp.trim().split(/\s+/).map(function(comp) {
                return replaceCaret(comp, options);
            }).join(' ');
        }
        function replaceCaret(comp, options) {
            debug('caret', comp, options);
            var r = options.loose ? safeRe[CARETLOOSE] : safeRe[CARET];
            return comp.replace(r, function(_, M, m, p, pr) {
                debug('caret', comp, _, M, m, p, pr);
                var ret;
                if (isX(M)) {
                    ret = '';
                } else if (isX(m)) {
                    ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
                } else if (isX(p)) {
                    if (M === '0') {
                        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
                    } else {
                        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
                    }
                } else if (pr) {
                    debug('replaceCaret pr', pr);
                    if (M === '0') {
                        if (m === '0') {
                            ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + m + '.' + (+p + 1);
                        } else {
                            ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + (+m + 1) + '.0';
                        }
                    } else {
                        ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + (+M + 1) + '.0.0';
                    }
                } else {
                    debug('no pr');
                    if (M === '0') {
                        if (m === '0') {
                            ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);
                        } else {
                            ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
                        }
                    } else {
                        ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
                    }
                }
                debug('caret return', ret);
                return ret;
            });
        }
        function replaceXRanges(comp, options) {
            debug('replaceXRanges', comp, options);
            return comp.split(/\s+/).map(function(comp) {
                return replaceXRange(comp, options);
            }).join(' ');
        }
        function replaceXRange(comp, options) {
            comp = comp.trim();
            var r = options.loose ? safeRe[XRANGELOOSE] : safeRe[XRANGE];
            return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
                debug('xRange', comp, ret, gtlt, M, m, p, pr);
                var xM = isX(M);
                var xm = xM || isX(m);
                var xp = xm || isX(p);
                var anyX = xp;
                if (gtlt === '=' && anyX) {
                    gtlt = '';
                }
                if (xM) {
                    if (gtlt === '>' || gtlt === '<') {
                        // nothing is allowed
                        ret = '<0.0.0';
                    } else {
                        // nothing is forbidden
                        ret = '*';
                    }
                } else if (gtlt && anyX) {
                    // we know patch is an x, because we have any x at all.
                    // replace X with 0
                    if (xm) {
                        m = 0;
                    }
                    p = 0;
                    if (gtlt === '>') {
                        // >1 => >=2.0.0
                        // >1.2 => >=1.3.0
                        // >1.2.3 => >= 1.2.4
                        gtlt = '>=';
                        if (xm) {
                            M = +M + 1;
                            m = 0;
                            p = 0;
                        } else {
                            m = +m + 1;
                            p = 0;
                        }
                    } else if (gtlt === '<=') {
                        // <=0.7.x is actually <0.8.0, since any 0.7.x should
                        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
                        gtlt = '<';
                        if (xm) {
                            M = +M + 1;
                        } else {
                            m = +m + 1;
                        }
                    }
                    ret = gtlt + M + '.' + m + '.' + p;
                } else if (xm) {
                    ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
                } else if (xp) {
                    ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
                }
                debug('xRange return', ret);
                return ret;
            });
        }
        // Because * is AND-ed with everything else in the comparator,
        // and '' means "any version", just remove the *s entirely.
        function replaceStars(comp, options) {
            debug('replaceStars', comp, options);
            // Looseness is ignored here.  star is always as loose as it gets!
            return comp.trim().replace(safeRe[STAR], '');
        }
        // This function is passed to string.replace(safeRe[HYPHENRANGE])
        // M, m, patch, prerelease, build
        // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
        // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
        // 1.2 - 3.4 => >=1.2.0 <3.5.0
        function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
            if (isX(fM)) {
                from = '';
            } else if (isX(fm)) {
                from = '>=' + fM + '.0.0';
            } else if (isX(fp)) {
                from = '>=' + fM + '.' + fm + '.0';
            } else {
                from = '>=' + from;
            }
            if (isX(tM)) {
                to = '';
            } else if (isX(tm)) {
                to = '<' + (+tM + 1) + '.0.0';
            } else if (isX(tp)) {
                to = '<' + tM + '.' + (+tm + 1) + '.0';
            } else if (tpr) {
                to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
            } else {
                to = '<=' + to;
            }
            return (from + ' ' + to).trim();
        }
        // if ANY of the sets match ALL of its comparators, then pass
        Range.prototype.test = function(version) {
            if (!version) {
                return false;
            }
            if (typeof version === 'string') {
                version = new SemVer(version, this.options);
            }
            for(var i = 0; i < this.set.length; i++){
                if (testSet(this.set[i], version, this.options)) {
                    return true;
                }
            }
            return false;
        };
        function testSet(set, version, options) {
            for(var i = 0; i < set.length; i++){
                if (!set[i].test(version)) {
                    return false;
                }
            }
            if (version.prerelease.length && !options.includePrerelease) {
                // Find the set of versions that are allowed to have prereleases
                // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
                // That should allow `1.2.3-pr.2` to pass.
                // However, `1.2.4-alpha.notready` should NOT be allowed,
                // even though it's within the range set by the comparators.
                for(i = 0; i < set.length; i++){
                    debug(set[i].semver);
                    if (set[i].semver === ANY) {
                        continue;
                    }
                    if (set[i].semver.prerelease.length > 0) {
                        var allowed = set[i].semver;
                        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
                            return true;
                        }
                    }
                }
                // Version has a -pre, but it's not one of the ones we like.
                return false;
            }
            return true;
        }
        exports.satisfies = satisfies;
        function satisfies(version, range, options) {
            try {
                range = new Range(range, options);
            } catch (er) {
                return false;
            }
            return range.test(version);
        }
        exports.maxSatisfying = maxSatisfying;
        function maxSatisfying(versions, range, options) {
            var max = null;
            var maxSV = null;
            try {
                var rangeObj = new Range(range, options);
            } catch (er) {
                return null;
            }
            versions.forEach(function(v) {
                if (rangeObj.test(v)) {
                    // satisfies(v, range, options)
                    if (!max || maxSV.compare(v) === -1) {
                        // compare(max, v, true)
                        max = v;
                        maxSV = new SemVer(max, options);
                    }
                }
            });
            return max;
        }
        exports.minSatisfying = minSatisfying;
        function minSatisfying(versions, range, options) {
            var min = null;
            var minSV = null;
            try {
                var rangeObj = new Range(range, options);
            } catch (er) {
                return null;
            }
            versions.forEach(function(v) {
                if (rangeObj.test(v)) {
                    // satisfies(v, range, options)
                    if (!min || minSV.compare(v) === 1) {
                        // compare(min, v, true)
                        min = v;
                        minSV = new SemVer(min, options);
                    }
                }
            });
            return min;
        }
        exports.minVersion = minVersion;
        function minVersion(range, loose) {
            range = new Range(range, loose);
            var minver = new SemVer('0.0.0');
            if (range.test(minver)) {
                return minver;
            }
            minver = new SemVer('0.0.0-0');
            if (range.test(minver)) {
                return minver;
            }
            minver = null;
            for(var i = 0; i < range.set.length; ++i){
                var comparators = range.set[i];
                comparators.forEach(function(comparator) {
                    // Clone to avoid manipulating the comparator's semver object.
                    var compver = new SemVer(comparator.semver.version);
                    switch(comparator.operator){
                        case '>':
                            if (compver.prerelease.length === 0) {
                                compver.patch++;
                            } else {
                                compver.prerelease.push(0);
                            }
                            compver.raw = compver.format();
                        /* fallthrough */ case '':
                        case '>=':
                            if (!minver || gt(minver, compver)) {
                                minver = compver;
                            }
                            break;
                        case '<':
                        case '<=':
                            break;
                        /* istanbul ignore next */ default:
                            throw new Error('Unexpected operation: ' + comparator.operator);
                    }
                });
            }
            if (minver && range.test(minver)) {
                return minver;
            }
            return null;
        }
        exports.validRange = validRange;
        function validRange(range, options) {
            try {
                // Return '*' instead of '' so that truthiness works.
                // This will throw if it's invalid anyway
                return new Range(range, options).range || '*';
            } catch (er) {
                return null;
            }
        }
        // Determine if version is less than all the versions possible in the range
        exports.ltr = ltr;
        function ltr(version, range, options) {
            return outside(version, range, '<', options);
        }
        // Determine if version is greater than all the versions possible in the range.
        exports.gtr = gtr;
        function gtr(version, range, options) {
            return outside(version, range, '>', options);
        }
        exports.outside = outside;
        function outside(version, range, hilo, options) {
            version = new SemVer(version, options);
            range = new Range(range, options);
            var gtfn, ltefn, ltfn, comp, ecomp;
            switch(hilo){
                case '>':
                    gtfn = gt;
                    ltefn = lte;
                    ltfn = lt;
                    comp = '>';
                    ecomp = '>=';
                    break;
                case '<':
                    gtfn = lt;
                    ltefn = gte;
                    ltfn = gt;
                    comp = '<';
                    ecomp = '<=';
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            // If it satisifes the range it is not outside
            if (satisfies(version, range, options)) {
                return false;
            }
            // From now on, variable terms are as if we're in "gtr" mode.
            // but note that everything is flipped for the "ltr" function.
            for(var i = 0; i < range.set.length; ++i){
                var comparators = range.set[i];
                var high = null;
                var low = null;
                comparators.forEach(function(comparator) {
                    if (comparator.semver === ANY) {
                        comparator = new Comparator('>=0.0.0');
                    }
                    high = high || comparator;
                    low = low || comparator;
                    if (gtfn(comparator.semver, high.semver, options)) {
                        high = comparator;
                    } else if (ltfn(comparator.semver, low.semver, options)) {
                        low = comparator;
                    }
                });
                // If the edge version comparator has a operator then our version
                // isn't outside it
                if (high.operator === comp || high.operator === ecomp) {
                    return false;
                }
                // If the lowest version comparator has an operator and our version
                // is less than it then it isn't higher than the range
                if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
                    return false;
                } else if (low.operator === ecomp && ltfn(version, low.semver)) {
                    return false;
                }
            }
            return true;
        }
        exports.prerelease = prerelease;
        function prerelease(version, options) {
            var parsed = parse(version, options);
            return parsed && parsed.prerelease.length ? parsed.prerelease : null;
        }
        exports.intersects = intersects;
        function intersects(r1, r2, options) {
            r1 = new Range(r1, options);
            r2 = new Range(r2, options);
            return r1.intersects(r2);
        }
        exports.coerce = coerce;
        function coerce(version) {
            if (_instanceof(version, SemVer)) {
                return version;
            }
            if (typeof version !== 'string') {
                return null;
            }
            var match = version.match(safeRe[COERCE]);
            if (match == null) {
                return null;
            }
            return parse(match[1] + '.' + (match[2] || '0') + '.' + (match[3] || '0'));
        }
    })(semver, semver.exports);
    return semver.exports;
}

var parse_1;
var hasRequiredParse;
function requireParse() {
    if (hasRequiredParse) return parse_1;
    hasRequiredParse = 1;
    var path = require$$0$2;
    var niceTry = requireSrc$1();
    var resolveCommand = requireResolveCommand();
    var escape = require_escape();
    var readShebang = requireReadShebang();
    var semver = requireSemver();
    var isWin = process.platform === 'win32';
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    // `options.shell` is supported in Node ^4.8.0, ^5.7.0 and >= 6.0.0
    var supportsShellOption = niceTry(function() {
        return semver.satisfies(process.version, '^4.8.0 || ^5.7.0 || >= 6.0.0', true);
    }) || false;
    function detectShebang(parsed) {
        parsed.file = resolveCommand(parsed);
        var shebang = parsed.file && readShebang(parsed.file);
        if (shebang) {
            parsed.args.unshift(parsed.file);
            parsed.command = shebang;
            return resolveCommand(parsed);
        }
        return parsed.file;
    }
    function parseNonShell(parsed) {
        if (!isWin) {
            return parsed;
        }
        // Detect & add support for shebangs
        var commandFile = detectShebang(parsed);
        // We don't need a shell if the command filename is an executable
        var needsShell = !isExecutableRegExp.test(commandFile);

        // KM: force node to use the shell
        if (!needsShell && ['node', 'node.exe', 'node.cmd'].indexOf(path.basename(commandFile).toLowerCase()) >= 0) needsShell = true;

        // If a shell is required, use cmd.exe and take care of escaping everything correctly
        // Note that `forceShell` is an hidden option used only in tests
        if (parsed.options.forceShell || needsShell) {
            // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
            // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
            // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
            // we need to double escape them
            var needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
            // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
            // This is necessary otherwise it will always fail with ENOENT in those cases
            parsed.command = path.normalize(parsed.command);
            // Escape command & arguments
            parsed.command = escape.command(parsed.command);
            parsed.args = parsed.args.map(function(arg) {
                return escape.argument(arg, needsDoubleEscapeMetaChars);
            });
            var shellCommand = [
                parsed.command
            ].concat(parsed.args).join(' ');
            parsed.args = [
                '/d',
                '/s',
                '/c',
                '"'.concat(shellCommand, '"')
            ];
            parsed.command = process.env.comspec || 'cmd.exe';
            parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
        }
        return parsed;
    }
    function parseShell(parsed) {
        // If node supports the shell option, there's no need to mimic its behavior
        if (supportsShellOption) {
            return parsed;
        }
        // Mimic node shell option
        // See https://github.com/nodejs/node/blob/b9f6a2dc059a1062776133f3d4fd848c4da7d150/lib/child_process.js#L335
        var shellCommand = [
            parsed.command
        ].concat(parsed.args).join(' ');
        if (isWin) {
            parsed.command = typeof parsed.options.shell === 'string' ? parsed.options.shell : process.env.comspec || 'cmd.exe';
            parsed.args = [
                '/d',
                '/s',
                '/c',
                '"'.concat(shellCommand, '"')
            ];
            parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
        } else {
            if (typeof parsed.options.shell === 'string') {
                parsed.command = parsed.options.shell;
            } else if (process.platform === 'android') {
                parsed.command = '/system/bin/sh';
            } else {
                parsed.command = '/bin/sh';
            }
            parsed.args = [
                '-c',
                shellCommand
            ];
        }
        return parsed;
    }
    function parse(command, args, options) {
        // Normalize arguments, similar to nodejs
        if (args && !Array.isArray(args)) {
            options = args;
            args = null;
        }
        args = args ? args.slice(0) : []; // Clone array to avoid changing the original
        options = Object.assign({}, options); // Clone object to avoid changing the original
        // Build our parsed object
        var parsed = {
            command: command,
            args: args,
            options: options,
            file: undefined,
            original: {
                command: command,
                args: args
            }
        };
        // Delegate further parsing to shell or non-shell
        return options.shell ? parseShell(parsed) : parseNonShell(parsed);
    }
    parse_1 = parse;
    return parse_1;
}

var enoent;
var hasRequiredEnoent;
function requireEnoent() {
    if (hasRequiredEnoent) return enoent;
    hasRequiredEnoent = 1;
    var isWin = process.platform === 'win32';
    function notFoundError(original, syscall) {
        return Object.assign(new Error("".concat(syscall, " ").concat(original.command, " ENOENT")), {
            code: 'ENOENT',
            errno: 'ENOENT',
            syscall: "".concat(syscall, " ").concat(original.command),
            path: original.command,
            spawnargs: original.args
        });
    }
    function hookChildProcess(cp, parsed) {
        if (!isWin) {
            return;
        }
        var originalEmit = cp.emit;
        cp.emit = function(name, arg1) {
            // If emitting "exit" event and exit code is 1, we need to check if
            // the command exists and emit an "error" instead
            // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
            if (name === 'exit') {
                var err = verifyENOENT(arg1, parsed);
                if (err) {
                    return originalEmit.call(cp, 'error', err);
                }
            }
            return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
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
        }
        return null;
    }
    enoent = {
        hookChildProcess: hookChildProcess,
        verifyENOENT: verifyENOENT,
        verifyENOENTSync: verifyENOENTSync,
        notFoundError: notFoundError
    };
    return enoent;
}

var hasRequiredCrossSpawn6_0_5;
function requireCrossSpawn6_0_5() {
    if (hasRequiredCrossSpawn6_0_5) return crossSpawn6_0_5.exports;
    hasRequiredCrossSpawn6_0_5 = 1;
    var cp = require$$0$3;
    var parse = requireParse();
    var enoent = requireEnoent();
    function spawn(command, args, options) {
        // Parse the arguments
        var parsed = parse(command, args, options);
        // Spawn the child process
        var spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
        // Hook into child process "exit" event to emit an error if the command
        // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
        enoent.hookChildProcess(spawned, parsed);
        return spawned;
    }
    function spawnSync(command, args, options) {
        // Parse the arguments
        var parsed = parse(command, args, options);
        // Spawn the child process
        var result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
        // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
        result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
        return result;
    }
    crossSpawn6_0_5.exports = spawn;
    crossSpawn6_0_5.exports.spawn = spawn;
    crossSpawn6_0_5.exports.sync = spawnSync;
    crossSpawn6_0_5.exports._parse = parse;
    crossSpawn6_0_5.exports._enoent = enoent;
    return crossSpawn6_0_5.exports;
}

var src;
var hasRequiredSrc;
function requireSrc() {
    if (hasRequiredSrc) return src;
    hasRequiredSrc = 1;
    requireAssign();
    requireKeys();
    requireFind();
    requireBufferV6Polyfill();
    var path = require$$0$2;
    if (!path.delimiter) {
        var isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
        path.delimiter = isWindows ? ';' : ':';
    }
    // early node is missing spawnSync
    var cp = require$$0$3;
    if (!cp.spawnSync) {
        var path1 = require$$0$2;
        var spawnCallback = path1.join(__dirname, '..', 'dist', 'cjs', 'spawnCallback.js');
        var functionExec = null; // break dependencies
        cp.spawnSync = function spawnSyncPolyfill(cmd, args, options) {
            if (!functionExec) functionExec = require$$6;
            return functionExec({
                callbacks: true
            }, spawnCallback, cmd, args, options || {});
        };
    }
    src = requireCrossSpawn6_0_5();
    return src;
}

var srcExports = requireSrc();
var index = /*@__PURE__*/ getDefaultExportFromCjs(srcExports);

module.exports = index;
