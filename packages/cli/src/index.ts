import process from 'process'
import cac from 'cac'
import pkg from '../package.json'
import init from './init'
import createApp from './create-app'

const cli = cac('haku')

cli
  .command('init [name]', '初始化项目')
  .action(async (name) => {
    let projectName = name
    if (!projectName) {
      const list = process.cwd().split('/')
      projectName = list[list.length - 1]
    }
    await init(projectName)
  })

cli
  .command('create <name>', '初始化子应用')
  .action(async (name) => {
    await createApp(name)
  })

cli.help()
cli.version(pkg.version)
cli.parse()
