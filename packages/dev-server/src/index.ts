import process from 'process'
import spawn from 'cross-spawn'
import inquirer from 'inquirer'
import { getPkgNames } from './utils.js'

function start (pkgName) {
  spawn('pnpm', ['start'], { cwd: `packages/${pkgName}`, stdio: 'inherit' })
}

export default function devServer (cli) {
  cli
    .command('micro [name]', 'desc')
    .action((name) => {
      const pkgNames = getPkgNames(process.cwd())
      if (pkgNames.length === 0) {
        return console.log('package 数量为0，请先创建应用')
      }

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
