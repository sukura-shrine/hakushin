import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import pluginJson from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/haku-cli.js',
    format: 'cjs'
  },
  exclude: [
    "./dist/**/*",
  ],
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    pluginJson(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
}
