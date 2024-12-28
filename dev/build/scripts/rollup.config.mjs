import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import externals from 'rollup-plugin-node-externals';
import swc from 'ts-swc-rollup-plugin';

const SKIPS = ['function-exec-sync', 'core-js/actual/object/assign', 'core-js/actual/object/keys', 'core-js/actual/array/find', 'buffer-v6-polyfill'];

export default {
  output: {
    format: 'cjs',
    name: 'crossSpawn',
  },
  plugins: [resolve({ resolveOnly: (module) => SKIPS.indexOf(module) < 0 }), commonjs(), externals({ deps: false, devDeps: false, builtinsPrefix: 'strip' }), swc()],
};
