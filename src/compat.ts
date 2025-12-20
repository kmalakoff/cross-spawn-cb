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
