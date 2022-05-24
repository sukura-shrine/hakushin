import os from 'os'
import fs from 'fs'
import path from 'path'

const regName = /(?<=name\s*=\s*)\S+/
const regEmail = /(?<=email\s*=\s*)\S+/

function gitUserInfo (dirname: string) {
  const gitConfigPath = path.join(dirname, '../', '.git/config')
  let userName
  let userEmail
  if (fs.existsSync(gitConfigPath)) {
    const file = fs.readFileSync(gitConfigPath, 'utf-8')
    userName = file.match(regName)
    userEmail = file.match(regEmail)
  }

  if (!userName) {
      const configPath = path.join(os.homedir(), '.gitconfig');
      const file = fs.readFileSync(configPath, 'utf-8')
      userName = file.match(regName)
      userEmail = file.match(regEmail)
  }
  const name = userName ? userName[0] : ''
  const email = userEmail ? userEmail[0] : ''
  return { name, email }
}

function generateShrineConfig (dirname: string) {
  const theDir = fs.opendirSync(dirname)

  const portList = []
  while (true) {
    const dirent = theDir.readSync()
    if (dirent === null) {
      break
    }
    if (!dirent.isDirectory()) {
      continue
    }
    const filePath = path.join(dirname, dirent.name, 'package.json')
    if (!fs.existsSync(filePath)) {
      continue
    }
    const pkgJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const port = pkgJson.shrine?.port
    port && portList.push(port)
  }
  const maxPort = Math.max(...portList)

  return {
    port: maxPort ? maxPort + 1 : 3000
  }
}

export default function mergePackageJson (dirname: string, appName: string) {
  const projectName = path.join(dirname, appName)
  try {
    const { name, email } = gitUserInfo(dirname)
    const pkgPath = path.join(projectName, 'package.json')
    let pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

    const shrine = generateShrineConfig(dirname)
    pkgJson = { ...pkgJson, name: appName, author: name, email, shrine }
    fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2))
  } catch (error: any) {
    throw new Error(error)
  }
}
