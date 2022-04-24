import process from 'process'
import cac from 'cac'
import pkg from '../package.json'

const cli = cac('shrine')

cli
  .command('init [name]', '初始化项目')
  .action((name) => {
    let projectName = name
    if (!projectName) {
      const list = process.cwd().split('/')
      projectName = list[list.length - 1]
    }
  })

cli.help()

cli.version(pkg.version)

const parsed = cli.parse()
// console.log(JSON.stringify(parsed, null, 2))
