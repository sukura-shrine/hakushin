import path from 'path'
import { defineConfig } from '@dian/vite'
import react from 'vite-preset-react'
import pkg from './package.json'

const cwd = process.cwd()

const server = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  port: pkg.shrine.port,
  proxy: {},
  host: '0.0.0.0',
}

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.join(cwd, './src') },
    ],
  },
  plugins: [react()],
  optimizeDeps: {
  },
  server,
})
