import fs from 'fs'
import path from 'path'
import process from 'process'
import chalk from 'chalk'
import spawn from 'cross-spawn'

export default async function init (appName: string) {
  console.log(chalk.yellow(`  build app ${appName}`))
  console.log()

  const appPath = path.join(process.cwd(), `packages/${appName}`)
  spawn.sync('pnpm', ['build'], { cwd: appPath })

  const distPath = path.join(appPath, 'dist')
  if (!fs.existsSync(distPath)) {
    return console.log(chalk.red(`  Error: ${distPath} 不存在`))
  }
  
  spawn.sync('mv', [distPath, './dist'])
  console.log(chalk.yellow('  done'))
  console.log()
}
