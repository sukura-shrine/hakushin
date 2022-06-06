import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const server = {
  port: 3999,
}

export default defineConfig({
  plugins: [
    react(),
  ],
  optimizeDeps: {
  },
  server,
})
