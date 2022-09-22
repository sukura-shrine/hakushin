import fs from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import qiankun from 'vite-plugin-qiankun'

const fileString = `
VITE_APP_NAME=${process.env.APP_NAME}
VITE_SERVICE_PORT=${process.env.SERVICE_PORT}
`
fs.writeFileSync('./.env.local', fileString)

const server = {
  port: process.env.SHRINE_PORT,
}

export default defineConfig({
  plugins: [
    react(),
  ],
  optimizeDeps: {
  },
  server,
})
