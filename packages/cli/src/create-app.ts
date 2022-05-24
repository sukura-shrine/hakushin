import fs from 'fs'
import path from 'path'
import process from 'process'
import chalk from 'chalk'
import { mergePackageJson, fetchGitFileTree } from '@hakushin/utils'

function writeTreeSync (tree, dir) {
  tree.forEach(item => {
    const thePathName = path.join(dir, item.name)
    if (item.type === 'tree') {
      fs.mkdirSync(thePathName)
      writeTreeSync(item.children, thePathName)
    } else if (item.type === 'blob') {
      fs.writeFileSync(thePathName, item.content)
    }
  })
}

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
  console.log()

  const tree = await fetchGitFileTree()

  fs.mkdirSync(projectName)
  writeTreeSync(tree, projectName)

  console.log(chalk.yellow('download end'))
  mergePackageJson(driname, appName)
}
