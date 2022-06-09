import { join } from 'path'
import fsPromises from 'fs/promises'

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

export default async function clientPackagesInfo (dirname: string) {
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
