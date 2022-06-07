import fs from 'fs'
import path from 'path'

import { TreeNode } from './index.d'

export default function writeFileTreeSync (tree: TreeNode[], dir: string) {
  tree.forEach(item => {
    const thePathName = path.join(dir, item.name)
    if (item.type === 'dir') {
      fs.mkdirSync(thePathName)
      writeFileTreeSync(item.children, thePathName)
    } else if (item.type === 'file') {
      fs.writeFileSync(thePathName, item.content)
    }
  })
}
