import fs from 'fs'
import path from 'path'
import process from 'process'
import cp from 'child_process'
import chalk from 'chalk'
import { mergePackageJson, fetchGitFileTree, writeFileTreeSync, clientConfig } from '@hakushin/utils'

export default async function create (appName: string, ref: string = 'pc') {
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
  console.log(` >branch: ${ref}`)
  console.log(chalk.yellow(' >download start'))
  console.log()

  const tree = await fetchGitFileTree(ref)

  fs.mkdirSync(projectName)
  writeFileTreeSync(tree, projectName)

  console.log(chalk.yellow(' >download end'))
  const { port } = await clientConfig()
  // 防止用户传递字符串
  const basePort = port && Number(port)
  await mergePackageJson(driname, appName, basePort)

  cp.execSync('pnpm install', { cwd: projectName, stdio: 'inherit' })
}
