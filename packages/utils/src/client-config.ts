import path from 'path'
import process from 'process'

interface ConfigOptions {
  type: string
  port: number
  plugins: any[]
}

export default async function clientConfig (): Promise<ConfigOptions> {
  const configPath = path.join(process.cwd(), 'shrine.config.js')
  return (await import(configPath)).default
}
