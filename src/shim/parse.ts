/**
 * Command parsing for cross-platform spawn
 * Simplified from cross-spawn v6.0.5
 */

import path from 'path';
import { objectAssign } from '../compat.ts';
import { isWindows } from '../constants.ts';
import { escapeArgument, escapeCommand } from './escape.ts';
import { resolveCommand } from './resolve.ts';
import { readShebang } from './shebang.ts';
import type { Parsed, ShimSpawnOptions } from './types.ts';

const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

// Node ^4.8.0 || ^5.7.0 || >= 6.0.0 supports shell option natively
// See: https://github.com/nodejs/node/pull/4598
const [major, minor] = process.versions.node.split('.').map(Number);
const supportsShellOption = major >= 6 || (major === 5 && minor >= 7) || (major === 4 && minor >= 8);

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
  if (!isWindows) return parsed;

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
  // If node supports the shell option, there's no need to mimic its behavior
  if (supportsShellOption) {
    return parsed;
  }

  // Mimic node shell option for older Node versions
  const shellCommand = [parsed.command].concat(parsed.args).join(' ');

  if (isWindows) {
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

// Handle NODE/npm_node_execpath env vars for node commands
const NODES = ['node', 'node.exe', 'node.cmd'];

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

  // Build parsed object with original command/args BEFORE any substitution
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

  // Substitute node command with NODE env var if set
  if (NODES.indexOf(path.basename(parsed.command).toLowerCase()) >= 0) {
    const env = opts.env || process.env;
    parsed.command = env.NODE || env.npm_node_execpath || parsed.command;
  }

  return opts.shell ? parseShell(parsed) : parseNonShell(parsed);
}
