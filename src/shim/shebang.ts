/**
 * Shebang detection for cross-platform script execution
 * Extracted from cross-spawn v6.0.5
 */

import fs from 'fs';
import { allocBuffer } from '../compat.ts';

const shebangRegex = /^#!.*/;

function parseShebang(str: string): string | null {
  const match = str.match(shebangRegex);
  if (!match) return null;

  const arr = match[0].replace(/#! ?/, '').split(' ');
  const bin = arr[0].split('/').pop();
  const arg = arr[1];

  return bin === 'env' ? arg : bin + (arg ? ` ${arg}` : '');
}

export function readShebang(command: string): string | null {
  const size = 150;
  const buffer = allocBuffer(size);

  let fd: number | undefined;
  try {
    fd = fs.openSync(command, 'r');
    fs.readSync(fd, buffer, 0, size, 0);
    fs.closeSync(fd);
  } catch (_e) {
    return null;
  }

  return parseShebang(buffer.toString());
}
