import path from 'path'
import process from 'process'

export default async function clientConfig () {
  const configPath = path.join(process.cwd(), 'shrine.config.js')
  return (await import(configPath)).default
}
