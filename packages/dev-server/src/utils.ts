import { join } from 'path'
import fs from 'fs'

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
