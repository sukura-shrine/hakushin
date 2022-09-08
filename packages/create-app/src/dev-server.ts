import process from 'process'
import spawn from 'cross-spawn'
import inquirer from 'inquirer'
import { clientPackagesInfo } from '@hakushin/utils'

function start (pkgName) {
  const child = spawn('pnpm', ['start'], { cwd: `packages/${pkgName}`, stdio: 'inherit' })
  // 方便测试脚本关闭子进程
  process.on('message', (msg) => {
    if (msg === 'exit') {
      child.kill()
      process.exit(0)
    }
  })
}

export default async function devServer (name) {
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
}
