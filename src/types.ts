import type * as child_process from 'child_process';

export type ChildProcess = child_process.ChildProcess;
export interface SpawnOptions extends child_process.SpawnOptions {
  encoding?: BufferEncoding;
  env?: NodeJS.ProcessEnv;
  input?: string | Buffer;
}
export type SpawnResult = child_process.SpawnSyncReturns<string | Buffer>;

export interface SpawnError extends Error, SpawnResult {
  code?: string;
}
export type SpawnCallback = (err?: SpawnError, res?: SpawnResult) => void;
