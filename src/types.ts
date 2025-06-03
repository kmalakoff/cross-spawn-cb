import type * as child_process from 'child_process';

export type ChildProcess = child_process.ChildProcess;
export interface SpawnOptions extends child_process.SpawnOptions {
  encoding?: BufferEncoding;
  env?: NodeJS.ProcessEnv;
  input?: string | Buffer;
}
export interface SpawnSyncOptions extends child_process.SpawnSyncOptions {
  encoding?: BufferEncoding;
  env?: NodeJS.ProcessEnv;
  input?: string | Buffer;
}
export type SpawnResult = child_process.SpawnSyncReturns<string | Buffer>;

export interface Parsed {
  command: string;
  args: string[];
  options: SpawnOptions | SpawnSyncOptions;
}

export interface NotFoundError extends Error {
  code?: string;
  errno?: string;
  syscall?: string;
  path?: string;
  spawnargs?: string[];
}
export interface SpawnError extends NotFoundError, SpawnResult {}

export type SpawnCallback = (err?: SpawnError, res?: SpawnResult) => void;

export type hookChildProcess = (cp: ChildProcess, parsed: Parsed) => undefined;
export type verifyENOENT = (status: number, parsed: Parsed) => NotFoundError | null;
export type verifyENOENTSync = (status: number, parsed: Parsed) => NotFoundError | null;
export type notFoundError = (cp: ChildProcess, parsed: Parsed) => NotFoundError;
