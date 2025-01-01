import type { SpawnOptions as SpawnOptionsBase, SpawnSyncReturns } from 'child_process';

export type { ChildProcess } from 'child_process';
export interface SpawnOptions extends SpawnOptionsBase {
  encoding?: BufferEncoding;
  env?: NodeJS.ProcessEnv;
  input?: string | Buffer;
}
export type SpawnResult = SpawnSyncReturns<string | Buffer>;

export interface SpawnError extends Error {
  status?: number;
  stderr?: string | Buffer;
  code?: string;
}
export type SpawnCallback = (err?: SpawnError, res?: SpawnResult) => void;
