import fs from 'fs'
import fspro from 'fs/promises'
import path from 'path'
import process from 'process'
// import spawn from 'cross-spawn'

export default async function (appName: string) {
  const driname = process.cwd()
  const projectName = path.join(driname, appName)
  if (!fs.existsSync(projectName)) {
    throw new Error('')
  }
  await fspro.cp('../../shrine-template', projectName)

  // spawn.sync(`cd ${appName} & pnpm install`)
}
