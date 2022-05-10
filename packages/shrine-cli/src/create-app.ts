import fs from 'fs'
import path from 'path'
import process from 'process'
import cp from 'child_process'
import { mergePackageJson } from '@shrine/utils'

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

  const args = ['clone', '-b', 'mobile', `https://github.com/sukura-shrine/app-template.git`, appName]
  const child = cp.spawn('git', args, { stdio: 'inherit', cwd: driname })

  child.on('close', (code: number) => {
    if (code !== 0) {
      return console.error('');
    }
    mergePackageJson(driname, appName)
  })
}
