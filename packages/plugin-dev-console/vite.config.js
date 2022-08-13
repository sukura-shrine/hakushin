import fs from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const fileString = `
VITE_APP_NAME=${process.env.APP_NAME}
VITE_SERVICE_PORT=${process.env.SERVICE_PORT}
`
fs.writeFileSync('./.env.local', fileString)

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
