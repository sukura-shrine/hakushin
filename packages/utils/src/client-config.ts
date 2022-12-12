import path from 'path'
import process from 'process'

interface ConfigOptions {
  type: string
  template?: string
  port: number
  plugins: any[]
}

export default async function clientConfig (): Promise<ConfigOptions> {
  // windows要求必须加协议头
  const cwd = process.cwd().replace(/^.:/, a => `file:\\\\${a}`)
  const configPath = path.join(cwd, 'shrine.config.js')
  return (await import(configPath)).default
}
