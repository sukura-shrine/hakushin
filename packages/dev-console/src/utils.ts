import { join } from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'

export function getPkgNames (path) {
  try {
    const pkg = fs.readFileSync(join(path, 'package.json'), 'utf-8')
    const pkgJson = JSON.parse(pkg)
    let pkgNames = fs.readdirSync(join(path, 'packages'))
    if (pkgJson?.projectignore) {
      pkgNames = pkgNames.filter(name => !pkgJson.projectignore.includes(name))
    }
    return pkgNames
  } catch (error) {
    return []
  }
}

interface PkgInfo {
  name: string,
  version: string,
  description?: string,
  author?: string,
  email?: string,
  hakushin: {
    port: number
  }
}

export async function getClientPackagesInfo (dirname: string) {
  const list: PkgInfo[] = []
  try {
    const dir = await fsPromises.opendir(join(dirname, 'packages'))
    for await (const dirent of dir) {
      if (dirent.isDirectory()) {
        const pkgPath = join(dirname, 'packages', dirent.name, 'package.json')
        const pkgFile = await fsPromises.readFile(pkgPath, { encoding: 'utf-8' })
        const { name, version, description, author, email, hakushin } = JSON.parse(pkgFile)
        list.push({ name, version, description, author, email, hakushin })
      }
    }
    return list
  } catch (error) {
    throw error
  }
}
