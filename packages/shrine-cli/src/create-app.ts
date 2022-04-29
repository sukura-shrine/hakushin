import fs from 'fs'
import path from 'path'
import process from 'process'
import cp from 'child_process'

export default async function (appName: string) {
  const driname = process.cwd()
  const projectName = path.join(driname, appName)
  if (fs.existsSync(projectName)) {
    throw new Error(`${projectName} 文件夹已经存在`)
  }

  const args = ['clone', '-b', 'mobile', `https://github.com/sukura-shrine/app-template.git`, appName]
  const child = cp.spawn('git', args, { stdio: 'inherit' })

  child.on('close', (code: number) => {
    console.log('close')
    if (code !== 0) {
      return;
    }
  })
}
