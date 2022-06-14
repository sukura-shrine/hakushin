import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const server = {
  port: process.env.SHRINE_PORT,
}

const reactPlugin = react().filter(item => item.name !== 'vite:react-refresh')

export default defineConfig({
  plugins: [
    reactPlugin,
  ],
  optimizeDeps: {
  },
  server,
})
