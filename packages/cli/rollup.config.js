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
    pluginJson(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
}
