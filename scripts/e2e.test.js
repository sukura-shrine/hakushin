import fs from 'fs'
import util from 'util'
import path from 'path'
import process from 'process'
import child_process from 'child_process'
import { describe, test, expect } from 'vitest'

const exec = util.promisify(child_process.exec)

const checklog = ({ stdout, stderr }) => {
  if (stdout.includes('Error')) {
    throw stdout
  }
  if (stderr) {
    throw stderr
  }
}

const checkConfig = (config) => {
  const { port } = config
  expect(typeof port).toBe('number')
}

describe('e2e', async () => {
  let config

  await exec('rm -rf .dev-test/')
  await exec('mkdir .dev-test')

  const projectPath = '.dev-test/test-project'
  test('project init', async () => {
    const initRes = await exec(`node packages/create-app/bin/index.js ${projectPath}`)
    checklog(initRes)
  })

  test('check config', async () => {
    expect(fs.existsSync(`${projectPath}/shrine.config.js`)).toBe(true)

    const configPath = path.join(process.cwd(), '.dev-test/test-project/shrine.config.js')
    config = (await import(configPath)).default
    checkConfig(config)

    // 不初始化 husky 会报错
    await exec('git init', { cwd: projectPath })
  })

  test('create micro app', async () => {
    const createRes = await exec('node ../../packages/create-app/bin/index.js cp app1', { cwd: `${projectPath}` })
    checklog(createRes)

    expect(fs.existsSync('.dev-test/test-project/packages/app1/package.json')).toBe(true)
  })
})
