import fs from 'fs'
import path from 'path'
import process from 'process'
import chalk from 'chalk'
import * as download from 'download-git-repo'
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

  console.log(chalk.green('git repo: sukura-shrine/app-template'))
  console.log(chalk.green('branch: mobile'))
  console.log('download start')
  console.log(download)
  download('sukura-shrine/app-template#mobile', appName, (error) => {
    if (error) {
      return console.error(error)
    }
    console.log('download end')
    mergePackageJson(driname, appName)
  })
}
