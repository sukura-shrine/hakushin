import fs from 'fs'
import cp from 'child_process'

export default async function init (projectName: string) {
  if (fs.existsSync(projectName)) {
    throw new Error(`${projectName} 文件夹已经存在`)
  }

  const args = ['clone', '-b', 'main', `https://github.com/sukura-shrine/app-template.git`, projectName]
  const child = cp.spawn('git', args, { stdio: 'inherit' })

  child.on('close', (code: number) => {
    if (code !== 0) {
      return console.error(`INIT ERROR: code ${code}`)
    }
  })
}
