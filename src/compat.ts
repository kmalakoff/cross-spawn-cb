/**
 * Compatibility Layer for Node.js 0.8+
 * Provides polyfills for features not available in older Node versions.
 */

// Buffer.alloc (Node 4.5+)
const hasBufferAlloc = typeof Buffer.alloc === 'function';

export function allocBuffer(size: number): Buffer {
  if (hasBufferAlloc) {
    return Buffer.alloc(size);
  }
  // Node < 4.5 fallback
  const buffer = new (Buffer as unknown as new (size: number) => Buffer)(size);
  buffer.fill(0);
  return buffer;
}

// Object.assign (ES2015 / Node 4.0+)
const hasObjectAssign = typeof Object.assign === 'function';
const _hasOwnProperty = Object.prototype.hasOwnProperty;

export function objectAssign<T, U>(target: T, source: U): T & U {
  if (hasObjectAssign) {
    return Object.assign(target, source);
  }
  for (const key in source) {
    if (_hasOwnProperty.call(source, key)) {
      (target as Record<string, unknown>)[key] = (source as Record<string, unknown>)[key];
    }
  }
  return target as T & U;
}
