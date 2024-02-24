import './polyfills.cjs';

import spawnCallback from './spawnCallback';

export default spawnCallback;
export { default as spawn } from './spawnCallback';
export { default as sync } from './spawnSyncCallback';
