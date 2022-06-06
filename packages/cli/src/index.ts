import process from 'process'
import path from 'path'
import cac from 'cac'
// import pkg from '../package.json'
import init from './init.js'
import createApp from './create-app.js'
import devServer from '@hakushin/dev-server'
import devConsole from '@hakushin/dev-console'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const pkg = require(path.resolve('./package.json'))

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


devServer(cli)
devConsole(cli)

cli.help()
cli.version(pkg.version)
cli.parse()
