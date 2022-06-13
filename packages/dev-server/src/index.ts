import process from 'process'
import spawn from 'cross-spawn'
import inquirer from 'inquirer'
import { clientPackagesInfo } from '@hakushin/utils'

function start (pkgName) {
  spawn('pnpm', ['start'], { cwd: `packages/${pkgName}`, stdio: 'inherit' })
}

interface Options {
}

export default function devServer (options: Options) {
  return (cli) => {
    cli
      .command('micro [name]', 'desc')
      .action(async (name: string) => {
        const pkgNames = (await clientPackagesInfo(process.cwd())).map(item => item.name)
        if (pkgNames.length === 0) {
          return console.log('dev-server: package 数量为0，请先创建应用')
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
}
