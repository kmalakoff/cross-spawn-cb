var externals = require('rollup-plugin-node-externals').default;
var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var getBabelOutputPlugin = require('@rollup/plugin-babel').getBabelOutputPlugin;

var input = require.resolve('cross-spawn');

module.exports = {
  input,
  output: {
    file: `lib/cross-spawn.js`,
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    externals(),
    resolve.nodeResolve(),
    commonjs(),
    getBabelOutputPlugin({
      presets: [['@babel/preset-env', { modules: 'cjs' }]],
    }),
  ],
};
