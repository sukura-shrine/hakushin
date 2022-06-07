export interface TreeNode {
  type: string
  name: string
  dir: string
  content?: string
  children?: TreeNode[]
}
