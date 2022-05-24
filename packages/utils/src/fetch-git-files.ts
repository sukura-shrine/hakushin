import { Octokit } from 'octokit'
import path from 'path'

const octokit = new Octokit({})

type TreeNode = {
  type: string
  name: string
  dir: string
  content?: string
  children?: TreeNode[]
}
async function fetchTree (url: string, dir = '/'): Promise<TreeNode[]> {
  const { data } = await octokit.request(`GET ${url}`)
  const list = []
  for (const item of data.tree) {
    const node: TreeNode = { type: item.type, name: item.path, dir }
    if (item.type === 'tree') {
      node.children = await fetchTree(item.url, path.join(dir, item.path))
    } else if (item.type === 'blob') {
      node.content = await fetchFile(item.url)
      console.log(`- download file: ${item.path}`)
    }
    list.push(node)
  }
  return list
}

async function fetchFile (url: string): Promise<string> {
  const { data } = await octokit.request(`GET ${url}`)
  return Buffer.from(data.content, 'base64').toString('utf-8')
}

export default async function fetchGitFileTree (): Promise<TreeNode[]> {
  const url = '/repos/sukura-shrine/app-template/git/trees/3bcf28dc8f08d810a3fa54a27e11984f61a007f3'
  return await fetchTree(url)
}
