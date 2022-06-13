import fs from 'fs'
import path from 'path'
import process from 'process'

import cac from 'cac'
import init from './init.js'
import createApp from './create-app.js'
import { clientConfig } from '@hakushin/utils'

async function main () {
  const selfPkgPath = path.join(new URL('.', import.meta.url).pathname, '../package.json')
  const pkg = fs.readFileSync(selfPkgPath).toString()
  const { version } = JSON.parse(pkg)

  const cli = cac('haku')

  cli
    .command('[name]', '初始化项目')
    .action(async (name) => {
      let projectName = name
      if (!projectName) {
        const list = process.cwd().split('/')
        projectName = list[list.length - 1]
      }
      await init(projectName)
    })

  cli
    .command('create <name>', '创建子应用')
    .option('-r, --ref <name>', '模板的branch名称')
    .action(async (name, options) => {
      const { ref } = options
      await createApp(name, ref)
    })

  const shrineConfig = await clientConfig()
  shrineConfig.plugins?.forEach(plugin => {
    plugin(cli)
  })

  cli.help()
  cli.version(version)
  cli.parse()
}
main()
