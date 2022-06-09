import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const server = {
  port: 3999,
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
