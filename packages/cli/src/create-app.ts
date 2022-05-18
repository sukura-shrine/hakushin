import fs from 'fs'
import path from 'path'
import process from 'process'
import cp from 'child_process'
import chalk from 'chalk'
import { mergePackageJson } from '@hakushin/utils'

export default async function create (appName: string) {
  let driname = process.cwd().replace(/packages$/, '')

  if (!/packages$/.test(driname)) {
    driname = path.join(driname, 'packages')
    if (!fs.existsSync(driname)) {
      fs.mkdirSync(driname)
    }
  }

  const projectName = path.join(driname, appName)
  if (fs.existsSync(projectName)) {
    throw new Error(`${projectName} 文件夹已经存在`)
  }

  console.log('git repo: sukura-shrine/app-template')
  console.log('branch: mobile')
  console.log(chalk.yellow('download start'))

  const cmd = `git clone -b mobile https://github.com/sukura-shrine/app-template.git ${projectName}`

  cp.execSync(cmd, { stdio: 'inherit' })
  fs.rmSync(`${projectName}/.git`, { force: true, recursive: true })

  console.log(chalk.yellow('download end'))
  mergePackageJson(driname, appName)
}
