import fs from 'fs'
import path from 'path'
import process from 'process'
import spawn from 'cross-spawn'

import chalk from 'chalk'
import openUrl from 'open'
import inquirer from 'inquirer'
import { createRequire } from 'module'

import { getPkgNames } from './utils'
const require = createRequire(import.meta.url)


async function start (pkgName) {
  const subprocess = spawn('haku', ['micro', pkgName])
  subprocess.on('spawn', () => {
    const microPkg = fs.readFileSync(`packages/${pkgName}/package.json`).toString()
    const { hakushin: { port } } = JSON.parse(microPkg)

    console.log()
    console.log(`  Micro App ${chalk.cyan(pkgName)} started`)
    console.log()
    console.log('  > local:', chalk.cyan(`localhost:${port}`))

    spawn('pnpm', ['start'], { cwd: path.join(__dirname, '../'), stdio: 'inherit' })

    const shrineConfig = require(`${process.cwd()}/shrine.config.js`)
    openUrl(`http://localhost:${shrineConfig.port}`, { wait: true })
  })
  subprocess.on('error', (error) => {
    console.log(error)
  })
}

export default function devConsole (cli) {
  const pkgNames = getPkgNames(process.cwd())
  if (pkgNames.length === 0) {
    return console.log('package 数量为0，请先创建应用')
  }
  cli
    .command('start [name]', 'desc')
    .action((name) => {
      if (name) {
        return start(name)
      }
      inquirer.prompt([
        {
          type: 'list',
          name: 'pkgName',
          message: '选择要启动的应用',
          choices: pkgNames,
        },
      ]).then(({ pkgName }) => {
        start(pkgName)
      })
    })
}
