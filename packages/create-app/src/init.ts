import fs from 'fs'
import path from 'path'
import process from 'process'
import chalk from 'chalk'
import spawn from 'cross-spawn'
import { fetchGitFileTree, writeFileTreeSync } from '@hakushin/utils'

export default async function init (projectName: string) {
  if (fs.existsSync(projectName)) {
    throw new Error(`${projectName} 文件夹已经存在`)
  }

  const repo = 'sukura-shrine/app-template'

  console.log(`git repo: ${repo}`)
  console.log(' >branch: main')
  console.log(chalk.yellow(' >download start'))
  console.log()

  const tree = await fetchGitFileTree(repo, 'main')

  fs.mkdirSync(projectName)
  writeFileTreeSync(tree, projectName)

  console.log(chalk.yellow('  >download end'))
  console.log()

  spawn('pnpm', ['install'], { cwd: path.join(process.cwd(), projectName) })

  console.log(`cd ${projectName}`)
  console.log(`pnpm cp [name] 创建子应用`)
}
