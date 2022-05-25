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
  for (const item of data) {
    const node: TreeNode = { type: item.type, name: item.name, dir }
    if (item.type === 'dir') {
      node.children = await fetchTree(item.url, path.join(dir, item.name))
    } else if (item.type === 'file') {
      node.content = await fetchFile(item.git_url)
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
  const url = '/repos/sukura-shrine/app-template/contents?ref=mobile'
  return await fetchTree(url)
}
