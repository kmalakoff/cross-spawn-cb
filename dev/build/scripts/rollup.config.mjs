import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import externals from 'rollup-plugin-node-externals';
import swc from 'ts-swc-rollup-plugin';

const replacements = {}
replacements['Object.assign'] = 'objectAssign';
replacements['Object.keys(env).find('] = 'findKey(env,';
replacements['path.delimiter'] = 'pathDelimiter';
replacements['cp.spawnSync'] = 'cpSpawnSync';

const escape = (string) => string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
const replace = (replacements) => ({
  name: 'replace',
  transform: (code) => Object.keys(replacements).reduce((m, r) => m.replace(new RegExp(escape(r), 'g'), replacements[r]), code)
})

export default {
  output: { format: 'cjs', strict: false },
  plugins: [replace(replacements), , commonjs(), externals({ deps: false, devDeps: false, builtinsPrefix: 'strip' }), swc()],
};
