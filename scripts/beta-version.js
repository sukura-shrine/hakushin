import fs from 'fs'
import path from 'path'
import spawn from 'cross-spawn'
import process from 'process'

const options = { cwd: process.cwd() }
const file = fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8')
const { version } = JSON.parse(file)

const gitCommit = () => {
  spawn.sync('git', ['add', '.'], options)
  spawn.sync('git', ['commit', '-m', 'chore: Beta version update'], options)
}

if (/^\d+\.\d+\.\d+$/.test(version)) {
  spawn.sync('npm', ['version', `${version}-beta.0`], options)
  gitCommit()
} else if (/^\d+\.\d+\.\d+-beta\.\d+$/.test(version)) {
  const newVersion = version.replace(/\d+$/, (v) => Number(v) + 1)
  spawn.sync('npm', ['version', newVersion], options)
  gitCommit()
} else {
  throw new Error(`版本号无法解析 -> ${version}`)
}
