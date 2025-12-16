/**
 * Command parsing for cross-platform spawn
 * Simplified from cross-spawn v6.0.5
 */

import path from 'path';
import { objectAssign } from '../compat.ts';
import { escapeArgument, escapeCommand } from './escape.ts';
import { resolveCommand } from './resolve.ts';
import { readShebang } from './shebang.ts';
import type { Parsed, ShimSpawnOptions } from './types.ts';

const isWin = process.platform === 'win32';
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

function detectShebang(parsed: Parsed): string | null {
  parsed.file = resolveCommand(parsed);

  const shebang = parsed.file && readShebang(parsed.file);
  if (shebang) {
    parsed.args.unshift(parsed.file);
    parsed.command = shebang;
    return resolveCommand(parsed);
  }

  return parsed.file;
}

function parseNonShell(parsed: Parsed): Parsed {
  if (!isWin) return parsed;

  // Detect & add support for shebangs
  const commandFile = detectShebang(parsed);

  // We don't need a shell if the command filename is an executable
  const needsShell = !isExecutableRegExp.test(commandFile || '');

  if (parsed.options.forceShell || needsShell) {
    // Need to double escape meta chars if the command is a cmd-shim
    const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile || '');

    // Normalize posix paths into OS compatible paths
    parsed.command = path.normalize(parsed.command);

    // Escape command & arguments
    parsed.command = escapeCommand(parsed.command);
    parsed.args = parsed.args.map((arg) => escapeArgument(arg, needsDoubleEscapeMetaChars));

    const shellCommand = [parsed.command].concat(parsed.args).join(' ');

    parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
    parsed.command = process.env.comspec || 'cmd.exe';
    parsed.options.windowsVerbatimArguments = true;
  }

  return parsed;
}

function parseShell(parsed: Parsed): Parsed {
  // Mimic node shell option for older Node versions
  const shellCommand = [parsed.command].concat(parsed.args).join(' ');

  if (isWin) {
    parsed.command = typeof parsed.options.shell === 'string' ? parsed.options.shell : process.env.comspec || 'cmd.exe';
    parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
    parsed.options.windowsVerbatimArguments = true;
  } else {
    if (typeof parsed.options.shell === 'string') {
      parsed.command = parsed.options.shell;
    } else if (process.platform === 'android') {
      parsed.command = '/system/bin/sh';
    } else {
      parsed.command = '/bin/sh';
    }
    parsed.args = ['-c', shellCommand];
  }

  return parsed;
}

export function parse(command: string, args?: string[] | ShimSpawnOptions | null, options?: ShimSpawnOptions): Parsed {
  // Normalize arguments
  let argsArray: string[];
  let opts: ShimSpawnOptions;

  if (args && !Array.isArray(args)) {
    // args is actually options
    argsArray = [];
    opts = objectAssign({}, args);
  } else {
    argsArray = args ? (args as string[]).slice(0) : [];
    opts = objectAssign({}, options || {});
  }

  const parsed: Parsed = {
    command: command,
    args: argsArray,
    options: opts,
    file: undefined,
    original: {
      command: command,
      args: argsArray,
    },
  };

  return opts.shell ? parseShell(parsed) : parseNonShell(parsed);
}
